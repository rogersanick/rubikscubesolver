// CONSTUCT MOVE QUEUE FOR MAKING MOVES
export default class MoveQueue {
    constructor() {
        this.maxLength = 0;
        this.storage = [];

        this.enqueue = (move) => {
            if (Array.isArray(move)) {
                for (let singleMove of move) {
                this.maxLength += 1;
                this.storage.push(singleMove);
                }
            } else {
                this.maxLength += 1;
                this.storage.push(move);
            }
        }

        this.dequeue = () => {
            return this.storage.shift();
        }

        this.getLength = () => {
            return this.storage.length;
        }

        this.getMaxLength = () => {
            return this.maxLength;
        }
    }
}