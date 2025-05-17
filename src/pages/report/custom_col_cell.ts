import { ColCell, CornerCell, DataCell, RowCell, TextTheme } from '@antv/s2';

export class CustomColHeadCell extends ColCell {
  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();    
    return {
      ...defaultTextStyle,
      fontSize: 14,
      textAlign: 'center',
    };
    
  }
}

export class CustomRowHeadCell extends RowCell {
  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();
    
    // if(this.meta.rowIndex % 2 === 0){
    //   return {
    //     ...defaultTextStyle,
    //     fontSize: 16,
    //     fill: '#396',
    //     textAlign: 'left',
    //   };
    // }    
    return {
      ...defaultTextStyle,
      fontSize: 14,
      // fill: '#396',
      textAlign: 'center',
    };
    
  }
}


export class CustomCornerCell extends CornerCell {
  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();
    
    // if(this.meta.rowIndex % 2 === 0){
    //   return {
    //     ...defaultTextStyle,
    //     fontSize: 16,
    //     fill: '#396',
    //     textAlign: 'left',
    //   };
    // }    
    return {
      ...defaultTextStyle,
      fontSize: 14,
      // fill: '#396',
      textAlign: 'center',
    };
    
  }
}


export class CustomDataCell extends DataCell {

  
  // 重写绘制背景方法, 添加一个背景图片
  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();
    console.log(this.meta)
    
    if (this.meta.isSubTotals) {
      return {
        ...defaultTextStyle,
        fontSize: 14,
        textAlign: 'center',
      };
    }
    return {
      ...defaultTextStyle,
      fill: '#396',
    };
    
  }
}