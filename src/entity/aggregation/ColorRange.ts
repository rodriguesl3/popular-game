class ColorRange {
  static colors: ColorType[] = [
    { id: 1, color: "#ff0000", name: "red" },
    { id: 2, color: "#ff9400", name: "orange" },
    { id: 3, color: "#0000FF", name: "blue" }
  ]




  static getRandomColor() {
    const index = Math.floor(Math.random() * this.colors.length - 1) + 1;
    return this.colors[index];
  }
}

export type ColorType = { id: number, color: string, name: string }

export default ColorRange;