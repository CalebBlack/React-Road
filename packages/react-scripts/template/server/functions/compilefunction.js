class CompileFunction {
  constructor(...args){
    this.methods = args.filter(functionIn=>{return typeof functionIn === 'function' && functionIn.name});

    this.compile = this.compile.bind(this);
    this.chain = this.chain.bind(this);
    this.run = this.run.bind(this);
  }
  chain(...args){
    var newMethods = [];
    for (var i = 0; i < args.length; i++){
      var functionIn = args[i];
      if (functionIn && typeof functionIn === 'function' && functionIn.name && functionIn.name.toLowerCase() !== 'anonymous') {
        newMethods.push(functionIn);
      }
    }
    var output = new CompileFunction();
    output.methods = this.methods.concat(newMethods);
    console.log('beforeafter',this,output);
    return output;
  }
  compile(toFunction){
    return (...args)=>{
      return toFunction.apply(this.methods.reduce(function(map, obj) {map[obj.name] = obj;return map;}, {}),args);
    };
  }
  run(...args){
    return (this.compile(args[0])(args.slice(1)));
  }
}
module.exports = CompileFunction;
