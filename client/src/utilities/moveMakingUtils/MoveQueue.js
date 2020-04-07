// CONSTUCT MOVE QUEUE FOR MAKING MOVES
export default class MoveQueue {
    constructor(cubeId, handleMoveCallback, speed) {
        this.cubeId = cubeId
        this.speed = speed
        this.maxLength = 0;
        this.movesMade = [];
        this.movesQueued = [];
        this.running = true;
        this.speed = speed > 200 && speed ? speed : 400

        this.currMove = () => {
            if (this.running) {
                if (this.getLength()) {
                    return this.movesQueued[0]
                }
                return "NONE"
            }
            return "NONE"
        }

        this.moveMaker = () => {
            if (this.running) {
                if (this.getLength()) {
                    handleMoveCallback(this.dequeue())
                }
                setTimeout(() => { this.moveMaker() }, this.speed)
            }
        }

        this.start = () => {
            this.running = true
            this.moveMaker()
        }

        this.stop = (callback) => {
            this.running = false
            if (callback) { callback() }
        }

        this.enqueue = (move) => {
            if (this.running) {
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
        }

        this.dequeue = () => {
            const returnedMove = this.movesQueued.shift()
            this.movesMade.unshift(returnedMove)
            return returnedMove
        }

        this.getLength = () => {
            return this.movesQueued.length;
        }

        this.getMaxLength = () => {
            return this.maxLength;
        }

        this.reset = (callback) => {
            this.stop(() => {
                this.movesMade = []
                this.movesQueued = []
                if (callback) callback()
            })
        }
    }
}