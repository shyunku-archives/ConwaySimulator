class Canvas{
    constructor(canvasObject, canvasWrapper){
        this.canvasObject = canvasObject;
        this.canvasWrapper = canvasWrapper;
        this.context = canvasObject.getContext("2d");

        this.resize();
        window.addEventListener('resize', this.resize);
    }

    resize = () => {
        this.width = this.canvasObject.width = this.canvasWrapper.width();
        this.height = this.canvasObject.height = this.canvasWrapper.height();
    }
}