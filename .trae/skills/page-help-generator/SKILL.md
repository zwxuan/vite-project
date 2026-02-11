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

Use the following React/Ant Design code structure. 
**CRITICAL**: You MUST use the exact Chinese labels "角色：", "数据来源：", "功能说明：" as shown below.

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
                           Mandatory Items:
                           1. Role (角色)
                           2. Origin (数据来源)
                           3. Functionality (功能说明)
                        */}
                        <li>
                            <b>{i18n.t(LocaleHelper.getPageHelpRoleLabel()) || '角色：'}</b>
                            {i18n.t(LocaleHelper.getPageHelpRoleDesc())}
                        </li>
                        <li>
                            <b>{i18n.t(LocaleHelper.getPageHelpOriginLabel()) || '数据来源：'}</b>
                            {i18n.t(LocaleHelper.getPageHelpOriginDesc())}
                        </li>
                        <li>
                            <b>{i18n.t(LocaleHelper.getPageHelpFuncLabel()) || '功能说明：'}</b>
                            {i18n.t(LocaleHelper.getPageHelpFuncDesc())}
                        </li>
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

### Internationalization (I18n)
- Whenever possible, use `i18n.t()` for both the labels and the descriptions.
- If i18n keys are not yet available, default to the **Chinese labels**: `角色：`, `数据来源：`, `功能说明：`.
