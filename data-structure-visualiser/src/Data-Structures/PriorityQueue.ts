export class PriorityQueue<T> {
    private items: Array<{ priority: number; item: T }> = [];
  
    constructor(private compareFn: (a: T, b: T) => number) {}
  
    enqueue(item: T, priority: number) {
      const newItem = { priority, item };
      let added = false;
  
      for (let i = 0; i < this.items.length; i++) {2
        if (this.compareFn(newItem.item, this.items[i].item) < 0) {
          this.items.splice(i, 0, newItem);
          added = true;
          break;
        }
      }
  
      if (!added) {
        this.items.push(newItem);
      }
    }
  
    dequeue(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items.shift()?.item;
    }
  
    front(): T | undefined {
      return this.items[0]?.item;
    }
  
    size(): number {
      return this.items.length;
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }