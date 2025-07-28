import { ColCell, CornerCell, DataCell, FONT_FAMILY, renderRect, RowCell, S2Theme, TextTheme } from '@antv/s2';

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

const BORDER_COLOR = 'rgb(39, 44, 65)';
    const BACK_COLOR = 'rgb(67, 72, 91)';
    const HEADER_BACK_COLOR = '#353c59';
    const CELL_ACTIVE_BACK_COLOR = '#434c6c';
// 自定义主题, 可以根据自己的需求进行修改
export const customTheme: S2Theme = {
  // background: {
  //   color: HEADER_BACK_COLOR,
  // },
  // empty: {
  //   icon: {
  //     fill: '#fff',
  //     width: 64,
  //     height: 41,
  //     margin: {
  //       top: 0,
  //       right: 0,
  //       bottom: 24,
  //       left: 0,
  //     },
  //   },
  //   description: {
  //     fontFamily: FONT_FAMILY,
  //     fontSize: 12,
  //     fontWeight: 'normal',
  //     fill: '#fff',
  //     opacity: 1,
  //   },
  // },
  // cornerCell: {
  //   cell: {
  //     horizontalBorderColor: BORDER_COLOR,
  //     verticalBorderColor: BORDER_COLOR,
  //     padding: {
  //       top: 12,
  //       right: 8,
  //       bottom: 12,
  //       left: 8,
  //     },
  //     backgroundColor: HEADER_BACK_COLOR,
  //   },
  //   text: {
  //     fill: '#fff',
  //   },
  //   bolderText: {
  //     fill: '#fff',
  //     opacity: 0.4,
  //   },
  // },
  // splitLine: {
  //   horizontalBorderColor: BORDER_COLOR,
  //   horizontalBorderColorOpacity: 1,
  //   horizontalBorderWidth: 2,
  //   verticalBorderColor: BORDER_COLOR,
  //   verticalBorderColorOpacity: 1,
  //   verticalBorderWidth: 2,
  //   showShadow: true,
  //   shadowWidth: 10,
  //   shadowColors: {
  //     left: 'rgba(0,0,0,0.1)',
  //     right: 'rgba(0,0,0,0)',
  //   },
  // },
  // colCell: {
  //   cell: {
  //     horizontalBorderColor: BORDER_COLOR,
  //     verticalBorderColor: BORDER_COLOR,
  //     verticalBorderWidth: 2,
  //     horizontalBorderWidth: 2,
  //     padding: {
  //       top: 12,
  //       right: 8,
  //       bottom: 12,
  //       left: 8,
  //     },
  //     backgroundColor: HEADER_BACK_COLOR,
  //     interactionState: {
  //       hover: {
  //         backgroundColor: CELL_ACTIVE_BACK_COLOR,
  //         backgroundOpacity: 1,
  //       },
  //       selected: {
  //         backgroundColor: 'rgb(63, 69, 97)',
  //       },
  //     },
  //   },
  //   text: {
  //     fill: '#fff',
  //   },
  //   bolderText: {
  //     fill: '#fff',
  //     opacity: 0.4,
  //   },
  // },
  dataCell: {
    // icon: {
    //   size: 14,
    //   margin: {
    //     left: 10,
    //   },
    // },
    cell: {
      interactionState: {
        // hover: {
        //   backgroundColor: CELL_ACTIVE_BACK_COLOR,
        //   backgroundOpacity: 1,
        // },
        hoverFocus: {
          // backgroundColor: CELL_ACTIVE_BACK_COLOR,
          // backgroundOpacity: 1,
          borderColor: 'red',
          borderWidth: 1,
          borderOpacity: 0.5,
        },
        selected: {
          backgroundColor: '#F5F5DC',
          backgroundOpacity: 1,
          // borderColor: 'red',
          // borderWidth: 1,
          // borderOpacity: 0.5,
        },
        // unselected: {
        //   backgroundOpacity: 1,
        //   opacity: 1,
        // },
        // prepareSelect: {
        //   borderColor: CELL_ACTIVE_BACK_COLOR,
        // },
      },
      // horizontalBorderColor: BORDER_COLOR,
      // verticalBorderColor: BORDER_COLOR,
      // verticalBorderWidth: 1,
      // horizontalBorderWidth: 1,
      // padding: {
      //   top: 0,
      //   right: 8,
      //   bottom: 2,
      //   left: 0,
      // },
      // backgroundColorOpacity: 0.9,
      // backgroundColor: BACK_COLOR,
      // crossBackgroundColor: BACK_COLOR,
    },
    // text: {
    //   fill: '#fff',
    // },
  },
};