import sys,time

hasPI = False
try:
  import RPi.GPIO as GPIO
  sys.path.append(r'/home/pi')
  hasPI = True
except:
  print sys.exc_info()[0]
  print "Cannot import RPi.GPIO...likely you are not running on the Pi!"

hasPICam = False
try:
  import picamera
  hasPICam = True
except:
  pass

class Drawbot:

  def __init__(self, sleepTime = 0.5):
    pass

  def forward(self, speed):
    print "Calling forward"
    # asn: if speed is X, the time to run will depend on distance per second of robot?
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(19, GPIO.OUT)
      GPIO.setup(20, GPIO.OUT)
      GPIO.output(19, GPIO.HIGH)
      GPIO.output(20, GPIO.HIGH)
      time.sleep(float(speed))
      GPIO.output(19, GPIO.LOW)
      GPIO.output(20, GPIO.LOW)
      print "SET GPIO", 19, 20

  def backward(self, speed):
    print 'Calling backward!'
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(26, GPIO.OUT)
      GPIO.setup(21, GPIO.OUT)
      GPIO.output(26, GPIO.HIGH)
      GPIO.output(21, GPIO.HIGH)
      time.sleep(float(speed))
      GPIO.output(26, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)
      print "SET GPIO", 26, 21

  def right(self, speed):
    print 'Calling right!'
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(20, GPIO.OUT)
      GPIO.setup(26, GPIO.OUT)
      GPIO.output(20, GPIO.HIGH)
      GPIO.output(26, GPIO.HIGH)
      time.sleep(float(speed))
      GPIO.output(20, GPIO.LOW)
      GPIO.output(26, GPIO.LOW)
      print "SET GPIO", 20, 26


  def left(self, speed):
    print 'Calling left!'
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(19, GPIO.OUT)
      GPIO.setup(21, GPIO.OUT)
      GPIO.output(19, GPIO.HIGH)
      GPIO.output(21, GPIO.HIGH)
      time.sleep(float(speed))
      GPIO.output(19, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)
      print "SET GPIO", 19, 21

  def stop(self):
    print 'Calling stop!'
    if hasPI:
      GPIO.output(20, GPIO.LOW)
      GPIO.output(26, GPIO.LOW)
      GPIO.output(19, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)

  def streamCamera(self):
    if hasPICam:
      with picamera.PiCamera() as camera:
        stream = io.BytesIO()
        for foo in camera.capture_continuous(stream, format='jpeg'):
          stream.truncate()
          stream.seek(0)
          if process(stream):
            break
