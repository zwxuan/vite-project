import { ColCell, CornerCell, DataCell, renderRect, RowCell, TextTheme } from '@antv/s2';

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

  drawBackgroundShape() {
    const defaultTextStyle = super.getBBoxByType();
    //小计
    if (this.meta.isSubTotals) {
      this.backgroundShape = renderRect(this, {
        ...defaultTextStyle,
        fill: '#F5F5DC',
        fillOpacity: 0.9,
      });
      return;
    }
    //总计
    if (this.meta.isGrandTotals) {
      this.backgroundShape = renderRect(this, {
        ...defaultTextStyle,
        fill: '#F5F5DC',
        fillOpacity: 0.9,
      });
      return;
    }
    return super.drawBackgroundShape();
  }

  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();
    return {
      ...defaultTextStyle,
      fontSize: 14,
      // fill: '#396',
      // textAlign: 'center',
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

  drawBackgroundShape() {
    const defaultTextStyle = super.getBBoxByType();
    //小计
    if (this.meta.rowId?.includes('小计')) {
      this.backgroundShape = renderRect(this, {
        ...defaultTextStyle,
        fill: '#F5F5DC',
        fillOpacity: 0.9,
      });
      return;
    }
    //总计
    if (this.meta.rowId?.includes('总计')) {
      this.backgroundShape = renderRect(this, {
        ...defaultTextStyle,
        fill: '#F5F5DC',
        fillOpacity: 0.9,
      });
      return;
    }
    return super.drawBackgroundShape();
  }
  // 重写绘制背景方法, 添加一个背景图片
  public getTextStyle(): TextTheme {
    const defaultTextStyle: TextTheme = super.getTextStyle();
    console.log(this.meta.rowId?.includes('小计'));
    if (this.meta.rowId?.includes('小计') || this.meta.rowId?.includes('总计')) {
      return {
       ...defaultTextStyle,
        fontSize: 14,
        fill: '#333',
        textAlign: 'right',
      };
    }
    return {
      ...defaultTextStyle,
      // fill: '#396',
    };
    
  }
}