// 定义统一的API接口返回数据类型
export interface Result {
    code: number;
    message: string;
    data?: any;
}
