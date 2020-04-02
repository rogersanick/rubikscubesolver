// CONSTUCT MOVE QUEUE FOR MAKING MOVES
export default class MoveQueue {
    constructor(cubeId, callback, speed) {
        this.cubeId = cubeId
        this.speed = speed
        this.maxLength = 0;
        this.movesMade = [];
        this.movesQueued = [];
        this.running = true;
        this.speed = speed > 200 && speed ? speed : 400

        this.moveMaker = () => {
            if (this.getLength()) {
                this.dequeue()
            }
            if (this.running) {
                setTimeout(() => { this.moveMaker() }, this.speed)
            }
        }

        this.start = () => {
            this.running = true
            this.moveMaker()
        }

        this.stop = () => {
            this.running = false
        }

        this.enqueue = (move) => {
            if (Array.isArray(move)) {
                for (let singleMove of move) {
                    this.maxLength += 1;
                    this.movesQueued.push(singleMove);
                }
            } else {
                this.maxLength += 1;
                this.movesQueued.push(move);
            }
        }

        this.dequeue = () => {
            const returnedMove = this.movesQueued.shift()
            callback(returnedMove)
            this.movesMade.unshift(returnedMove)
            return returnedMove
        }

        this.getLength = () => {
            return this.movesQueued.length;
        }

        this.getMaxLength = () => {
            return this.maxLength;
        }
    }
}