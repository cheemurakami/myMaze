'use strict';

(() => {
  class Maze {
    constructor(row, col, canvas){

      if (row < 5 || col < 5 || row % 2 === 0 || col % 2 ===0){
        alert("Enter odd numbers greater than 5") //has to be odd num and greater than 5
      }
      this.ctx = canvas.getContext('2d');
      this.row = row;
      this.col = col;
      this.data = this.getData();
      this.WALL_SIZE = 10;
      canvas.height = this.row * this.WALL_SIZE; //bc default is 150px
      canvas.width = this.col * this.WALL_SIZE; //bc default is 300px
    }

    getData(){
      let data = []; //why const
      
      for(let row = 0; row < this.row; row++){
        data[row] = [];　
        for(let col = 0; col < this.col; col++){
          data[row][col] = 1; // all walls
        }
      }

      for(let row = 1; row < this.row -1; row++){
        for(let col = 1; col < this.col -1; col++){
          data[row][col] = 0; //外側だけ壁
        }
      }
        
      for(let row = 2; row < this.row -2; row += 2){
        for(let col = 2; col < this.col -2; col +=2){
          data[row][col] = 1; //格子状
        }
      }

      for(let row = 2; row < this.row -2; row += 2){
        for(let col = 2; col < this.col -2; col +=2){
          let destRow;
          let destCol;

          do {
            const dir = row === 2 ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 3) + 1;
            switch (dir){
              case 0: //up
              destRow = row -1
              destCol = col
                break;
              case 1: //down
              destRow = row +1
              destCol = col
                break;
              case 2: //right
              destRow = row 
              destCol = col +1
                break;
              case 3: //left
              destRow = row 
              destCol = col -1
                break;
            }
          } while (data[destRow][destCol] === 1);

          data[destRow][destCol] = 1;
        }
        
      }
        
      return data;
    }

    render(){
      for(let row = 0; row < this.data.length; row++){
        for(let col = 0; col < this.data[row].length; col++){
          if(this.data[row][col] === 1){
            this.ctx.fillRect(
              col * this.WALL_SIZE, 
              row * this.WALL_SIZE, 
              this.WALL_SIZE, 
              this.WALL_SIZE) // kabe no size set to 10, 幅と高さも10
          }
        }
      }
    }
  }

  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  const maze = new Maze(7, 19, canvas);
  maze.render();
})();