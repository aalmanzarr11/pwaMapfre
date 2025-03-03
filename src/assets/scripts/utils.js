function validMaxLength(input){

    if (this.value && this.maxLength && this.value.length > this.maxLength){
        this.value = this.value.slice(0, this.maxLength);
    }

}