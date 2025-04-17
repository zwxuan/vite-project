import React from 'react';
import './style.less';

interface CodeBoxMetaProps {
    title: string;
    children: React.ReactNode;
}

const CodeBoxMeta: React.FC<CodeBoxMetaProps> = ({ title, children }) => {
    return (
        <section className="code-box-meta markdown">
            <div className="code-box-title">
                <label>{title}</label>
            </div>
            <div className="code-box-description">
                {children}
            </div>
        </section>
    );
};

export default CodeBoxMeta;