// CONSTUCT MOVE QUEUE FOR MAKING MOVES
export default class MoveQueue {
    constructor(callback) {
        this.maxLength = 0;
        this.movesMade = [];
        this.movesQueued = [];

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