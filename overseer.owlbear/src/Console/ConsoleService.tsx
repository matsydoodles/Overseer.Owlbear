class ConsoleService {
  private static instance: ConsoleService;
  private messages: string[];
  private listeners: ((message: string) => void)[];

  private constructor() {
    this.messages = [];
    this.listeners = [];
  }

  public static getInstance(): ConsoleService {
    if (!ConsoleService.instance) {
      ConsoleService.instance = new ConsoleService();
    }
    return ConsoleService.instance;
  }

  public postMessage(message: string): void {
    this.messages.push(message);
    this.emitMessage(message);
  }

  public getMessages(): string[] {
    return this.messages;
  }

  public onMessage(listener: (message: string) => void): void {
    this.listeners.push(listener);
  }

  public offMessage(listener: (message: string) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private emitMessage(message: string): void {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

export default ConsoleService;
