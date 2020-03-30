export default function setupKeyListeners(document, setStateCallback, moveQueue) {

    // SET UP KEY LISTENERS TO MOVE / INTERACT WITH CUBE
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        let keyNum = parseInt(evt.keyCode);
        if (evt.keyCode == 37) {
          setStateCallback({
            spinLeft: true
          })
        } else if (evt.keyCode == 38) {
          setStateCallback({
            spinUp: true
          })
        } else if (evt.keyCode == 39) {
          setStateCallback({
            spinRight: true
          })
        } else if (evt.keyCode == 40) {
          setStateCallback({
            spinDown: true
          })
        } else if (evt.keyCode == 85) {
          this.handleReset();
        } else if (evt.keyCode == 16) {
          this.handleResetPosition();
        } else if ([81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86].indexOf(keyNum) !== -1) {
          let moveIndex = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86].indexOf(keyNum);
          let move = ['U', 'Ui', 'D', 'Di', 'L', 'Li', 'R', 'Ri', 'F', 'Fi', 'B', 'Bi'][moveIndex];
          moveQueue.enqueue(move)
        }
      };
  
      document.onkeyup = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 37) {
          setStateCallback({
            spinLeft: false
          })
        } else if (evt.keyCode == 38) {
          setStateCallback({
            spinUp: false
          })
        } else if (evt.keyCode == 39) {
          setStateCallback({
            spinRight: false
          })
        } else if (evt.keyCode == 40) {
          setStateCallback({
            spinDown: false
          })
        }
      };
  
      document.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
      }, false);
}
