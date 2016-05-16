export const CanvasUtils = {
  round(x:number): number {
    return (0.5 + x) << 0;
  },
  
  // test(target: any, key: string, value: any) {
  //   return {
  //     value: function (...args: any[]) {
  //       var result = value.value.apply(this, args);
  //       return result;
  //     }
  //   }
  // }
}