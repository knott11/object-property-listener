// 声明文件
  
type ChangeRecord = {  
  key: string;  
  oldValue: any;  
  newValue: any;  
};  
  
type OnChangeCallback = (changes: ChangeRecord[]) => any;  
  
declare function objectPropertyListener<T extends object>(  
  obj: T,  
  onChangeCallback?: OnChangeCallback  
): T & { value?: any };  
  
export { objectPropertyListener };