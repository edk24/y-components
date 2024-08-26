export interface YImageUploadProps {
    // 允许删除
    allowDelete?: boolean;
    // 多图上传
    multiple?: boolean;
    // 点击处理
    clickMode?: 'preview' | 'changefile';
    // 是否允许拖动排序
    drag?: boolean;
    // 块级样式 （仅支持单图上传， count 参数失效）
    block?: boolean;
    // 图片上传的最大数量
    count?: number;
    // 图片资源
    modelValue: string[] | string;
    // 域名
    domain?: string;
    // 图片后缀，如阿里 oss 缩略图 ?x-oss-process=image/resize,m_fill,w_100,h_100
    suffix?: string;
    // 上传处理
    handleUpload: (file: File) => Promise<string>;
    // 删除处理
    handleDelete: (src: string, index: number, values: string | string[]) => Promise<boolean>;
    // 间隔距离
    gap?: number;
    // 大小限制
    sizeLimit?: number;
    // 文件格式限制，如：image/jpeg,image/png
    accept?: string;
    // 幽灵模式 （不可见， 点击处理上传但是不回显，交由用户自行渲染显示）
    ghost?: boolean;
    // 图片渲染模式 (拉伸、填充)
    imageMode: 'aspectFit' | 'aspectFill';
}