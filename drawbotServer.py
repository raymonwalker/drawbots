from flask import Flask, render_template, request, jsonify, redirect
import datetime
import sys
import time
import serial
import re
from drawbot import *

sys.path.append(r'/home/pi')

app = Flask(__name__, template_folder='templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
drawbot = Drawbot(0.5)

@app.route("/")
def hello():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   ip = re.search('([0-9]+.[0-9]+.[0-9]+.[0-9]+)', request.url_root).group(0)
   video_url = 'http://%s:8080/html'%ip
   print video_url
   templateData = {
      'title' : 'Drawbots',
      'time': timeString,
      'video_url' : video_url
      }
   return render_template('main.html', **templateData)

@app.route("/follow")
def follow():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   ip = re.search('([0-9]+.[0-9]+.[0-9]+.[0-9]+)', request.url_root).group(0)
   video_url = 'http://%s:8080/html'%ip
   templateData = {
      'title' : 'Drawbots',
      'time': timeString,
      'video_url' : video_url
      }
   return render_template('follow.html', **templateData)

@app.route("/cam")
def cam():
    print request.url_root
    ip = re.search('([0-9]+.[0-9]+.[0-9]+.[0-9]+)', request.url_root).group(0)
    print "Redirecting to " + ip
    return redirect('http://%s:8080/html'%ip, code=302)

@app.route("/forward/",methods=['GET', 'POST'])
def forward():
  speed = request.args.get('speed', None)
  drawbot.forward(speed)
  return 'Click.'

@app.route("/backward/",methods=['GET', 'POST'])
def backward():
  speed = request.args.get('speed', None)
  drawbot.backward(speed)
  return 'Click.'

@app.route("/right/",methods=['GET', 'POST'])
def right():
  speed = request.args.get('speed', None)
  drawbot.right(speed)
  return 'Click.'

@app.route("/left/",methods=['GET', 'POST'])
def left():
  speed = request.args.get('speed', None)
  drawbot.left(speed)
  return 'Click.'

@app.route("/stop/",methods=['GET', 'POST'])
def stop():
  drawbot.stop()
  return 'Click.'

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=8082, debug=True, threaded=True)
