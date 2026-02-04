---
name: "page-help-generator"
description: "Generates standardized help tooltip code for page headers. Invoke when creating new page components or adding help documentation to existing pages."
---

# Page Help Generator

This skill ensures that all page components include a standardized help tooltip in the header area.

## Usage
Invoke this skill when:
- Creating a new page component.
- Adding help/explanation sections to an existing page.
- The user requests to "add the standard explanation format".

## Implementation Guide

The tooltip should be placed inside the page header, typically within the `bill-info-title` area or next to the page title.

### Code Template

Use the following React/Ant Design code structure:

```tsx
<Tooltip
    title={
        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                <li style={{ marginBottom: '10px' }}>
                    <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                        <b>说明</b>
                    </span>
                    <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                        {/* 
                           Replace the following list items with the actual content required for the page.
                           Format: <li><b>Key:</b> Value/Description</li>
                        */}
                        <li><b>角色：</b>Description of the page's role...</li>
                        <li><b>数据来源：</b>Where the data comes from...</li>
                        <li><b>Field Name：</b>Description...</li>
                    </ul>
                </li>
            </ol>
        </div>
    }
    color='white'
>
    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
</Tooltip>
```

### Style Requirements
- **Tooltip Background**: White (`#fff`) with black text (`#000`).
- **Font Color**: `#666666`.
- **Font Size**: `12px`.
- **Badge Style**: "说明" label with gray background (`#f1f1f1`) and bold text.
- **List Style**: Circle bullets (`listStyleType: 'circle'`) with `1.8` line height.
- **Icon**: `iconfont icon-bangzhutishi`.
