
import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Tooltip, Calendar, Modal, Input, Button, List, Badge, Typography, Space, message, DatePicker, Form, Popconfirm, ConfigProvider } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import CustomIcon from "@/components/custom-icon";
import './calendar.css'; // 引入自定义样式
import { RangePickerZH } from '@/components/date-picker';

// 设置dayjs为中文
dayjs.locale('zh-cn');

const { TextArea } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

interface Task {
    id: string;
    startDate: string;
    endDate: string;
    title: string;
    description?: string;
    createdAt: string;
}

const TaskCalendarView: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isRecentTasksVisible, setIsRecentTasksVisible] = useState(false);
    const [taskForm] = Form.useForm();

    // 获取指定日期的任务
    const getTasksForDate = (date: Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        return tasks.filter(task => {
            const startDate = dayjs(task.startDate);
            const endDate = dayjs(task.endDate);
            const currentDate = dayjs(dateStr);
            return (currentDate.isAfter(startDate, 'day') || currentDate.isSame(startDate, 'day')) && (currentDate.isBefore(endDate, 'day') || currentDate.isSame(endDate, 'day'));
        });
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    // 检查任务是否在指定日期开始
    const isTaskStartDate = (task: Task, date: Dayjs) => {
        return dayjs(task.startDate).isSame(date, 'day');
    };

    // 检查任务是否在指定日期结束
    const isTaskEndDate = (task: Task, date: Dayjs) => {
        return dayjs(task.endDate).isSame(date, 'day');
    };

    // 检查任务是否跨越指定日期（中间日期）
    const isTaskMiddleDate = (task: Task, date: Dayjs) => {
        const startDate = dayjs(task.startDate);
        const endDate = dayjs(task.endDate);
        const currentDate = dayjs(date.format('YYYY-MM-DD'));
        return currentDate.isAfter(startDate, 'day') && currentDate.isBefore(endDate, 'day');
    };

    // 生成任务条的配色方案（参考项目色系）
    const getTaskColor = (taskId: string) => {
        const colors = [
            { bg: '#f0f8ff', border: '#1890ff', text: '#1890ff' }, // 主蓝色
            { bg: '#f6ffed', border: '#52c41a', text: '#52c41a' }, // 成功绿色
            { bg: '#fff2f0', border: '#ff4d4f', text: '#ff4d4f' }, // 错误红色
            { bg: '#fff7e6', border: '#fa8c16', text: '#fa8c16' }, // 警告橙色
            { bg: '#f9f0ff', border: '#722ed1', text: '#722ed1' }, // 紫色
            { bg: '#e6fffb', border: '#13c2c2', text: '#13c2c2' }, // 青色
            { bg: '#fffbe6', border: '#faad14', text: '#faad14' }, // 黄色
            { bg: '#f9fbff', border: '#2B2C42', text: '#2B2C42' }, // 深灰色
        ];
        const index = (taskId.charCodeAt(0) * 137) % colors.length;
        return colors[index];
    };

    // 日期单元格渲染
    const dateCellRender = (value: Dayjs) => {
        const currentTasks = getTasksForDate(value);
        
        return (
            <div style={{ position: 'relative', height: '10px', minHeight: '80px' }}>
                {currentTasks.map((task, index) => {
                    const isStart = isTaskStartDate(task, value);
                    const isEnd = isTaskEndDate(task, value);
                    const isMiddle = isTaskMiddleDate(task, value);
                    const isHovered = hoveredTaskId === task.id;
                    
                    const taskColor = getTaskColor(task.id);
                    const top = `${28 + index * 20}px`;
                    const height = '16px';
                    
                    let borderRadius = '6px';
                    let left = '4px';
                    let right = '4px';
                    let marginLeft = '0px';
                    let marginRight = '0px';
                    
                    if (isStart && !isEnd) {
                        // 开始日期 - 左圆角，右边延伸到边界
                        borderRadius = '6px 0 0 6px';
                        left = '4px';
                        right = '-10px'; // 延伸到右边界外
                        marginRight = '0px';
                    } else if (isEnd && !isStart) {
                        // 结束日期 - 右圆角，左边从边界开始
                        borderRadius = '0 6px 6px 0';
                        left = '-8px'; // 从左边界外开始
                        right = '-2px';
                        marginLeft = '0px';
                    } else if (isMiddle) {
                        // 中间日期 - 无圆角，完全填充
                        borderRadius = '0';
                        left = '-8px';
                        right = '-10px';
                        marginLeft = '0px';
                        marginRight = '0px';
                    }
                    
    // 处理任务条悬浮事件
    const handleTaskHover = (taskId: string, isHovering: boolean) => {
        setHoveredTaskId(isHovering ? taskId : null);
    };

                    return (
                        <div 
                            key={task.id} 
                            className={`task-bar-segment ${isHovered ? 'task-hovered' : ''}`}
                            style={{ 
                                position: 'absolute',
                                left,
                                right,
                                top,
                                height,
                                fontSize: '12px', 
                                backgroundColor: taskColor.bg, 
                                color: taskColor.text, 
                                border: `1px solid ${taskColor.border}`,
                                padding: '2px 10px', 
                                borderRadius,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                zIndex: isHovered ? 20 : 5,
                                cursor: 'pointer',
                                boxShadow: isHovered 
                                    ? `0 4px 12px ${taskColor.border}40` 
                                    : `0 1px 3px ${taskColor.border}30`,
                                transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                marginLeft,
                                marginRight,
                                fontWeight: '500'
                            }}
                            title={`${task.title} (${dayjs(task.startDate).format('MM/DD')} - ${dayjs(task.endDate).format('MM/DD')}) - 点击编辑`}
                            onMouseEnter={() => handleTaskHover(task.id, true)}
                            onMouseLeave={() => handleTaskHover(task.id, false)}
                            onClick={(e) => handleTaskClick(task, e)}
                        >
                            {isStart && <span style={{ fontWeight: 600 }}>{task.title}</span>}
                            {isMiddle && <span style={{ fontSize: '10px', opacity: 0.7, color: taskColor.text }}>···</span>}
                            {isEnd && !isStart && (
                                <span style={{ fontSize: '10px', opacity: 0.8, marginLeft: 'auto', color: taskColor.text }}>结束</span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // 月份单元格渲染
    const monthCellRender = (value: Dayjs) => {
        const monthTasks = tasks.filter(task => 
            dayjs(task.startDate).format('YYYY-MM') === value.format('YYYY-MM')
        );
        return monthTasks.length > 0 ? (
            <Badge count={monthTasks.length} style={{ backgroundColor: '#52c41a' }} />
        ) : null;
    };

    // 打开任务模态框（新建或编辑）
    const openTaskModal = (task?: Task, date?: Dayjs) => {
        if (task) {
            // 编辑模式
            setEditingTask(task);
            taskForm.setFieldsValue({
                title: task.title,
                description: task.description,
                dateRange: [dayjs(task.startDate), dayjs(task.endDate)]
            });
        } else {
            // 新建模式
            setEditingTask(null);
            setSelectedDate(date || null);
            taskForm.setFieldsValue({
                title: '',
                description: '',
                dateRange: date ? [date, date] : null
            });
        }
        setIsModalVisible(true);
    };

    // 处理日期点击
    const onDateSelect = (date: Dayjs) => {
        openTaskModal(undefined, date);
    };

    // 保存任务（新建或编辑）
    const handleSaveTask = async () => {
        try {
            const values = await taskForm.validateFields();
            
            if (editingTask) {
                // 编辑模式
                const updatedTask: Task = {
                    ...editingTask,
                    title: values.title.trim(),
                    description: values.description?.trim() || '',
                    startDate: values.dateRange[0].format('YYYY-MM-DD'),
                    endDate: values.dateRange[1].format('YYYY-MM-DD')
                };

                setTasks(prev => prev.map(task => 
                    task.id === editingTask.id ? updatedTask : task
                ));
                message.success('任务更新成功');
            } else {
                // 新建模式
                const newTask: Task = {
                    id: Date.now().toString(),
                    title: values.title.trim(),
                    description: values.description?.trim() || '',
                    startDate: values.dateRange[0].format('YYYY-MM-DD'),
                    endDate: values.dateRange[1].format('YYYY-MM-DD'),
                    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
                };

                setTasks(prev => [...prev, newTask]);
                message.success('任务添加成功');
            }
            
            handleCancelTask();
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 取消任务操作
    const handleCancelTask = () => {
        setIsModalVisible(false);
        setEditingTask(null);
        setSelectedDate(null);
        taskForm.resetFields();
    };

    // 编辑任务
    const handleEditTask = (task: Task) => {
        openTaskModal(task);
    };

    // 删除任务
    const handleDeleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        message.success('任务删除成功');
        handleCancelTask(); // 删除后关闭模态框
    };

    // 处理任务条点击事件
    const handleTaskClick = (task: Task, event: React.MouseEvent) => {
        event.stopPropagation(); // 阻止事件冒泡
        handleEditTask(task);
    };

    return (
        <ConfigProvider locale={zhCN}>
            <div style={{  }}>
                <div className="nc-bill-header-area">
                    <div className="header-title-search-area">
                        <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 日历管理
                                <Tooltip
                                    title={
                                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                            <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>任务管理</b></span>点击日历上的任意日期可以为该日期添加任务和日程安排。
                                                </li>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>任务显示</b></span>已添加任务的日期会显示蓝色标记，月视图下会显示任务数量徽章。
                                                </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <Text type="secondary">共有 {tasks.length} 个任务</Text>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                </div>
            </div>

            <div className='nc-bill-table-area' style={{ padding: '20px' ,overflowY: 'auto', overflowX: 'hidden',height: 'calc(100vh - 80px)' }}>
                <Calendar 
                    cellRender={(current, info) => {
                        if (info.type === 'date') {
                            return dateCellRender(current as Dayjs);
                        }
                        if (info.type === 'month') {
                            return monthCellRender(current as Dayjs);
                        }
                        return info.originNode;
                    }}
                    onSelect={onDateSelect}
                    style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '6px'
                    }}
                    className="continuous-task-calendar"
                />
            </div>

            {/* 统一任务模态框 */}
            <Modal
                title={editingTask ? '编辑任务' : '添加任务'}
                open={isModalVisible}
                onCancel={handleCancelTask}
                width={480}
                centered
                maskClosable={false}
                destroyOnClose
                footer={[
                    <div key="footer-container" style={{ 
                        display: 'flex', 
                        justifyContent: editingTask ? 'space-between' : 'flex-end', 
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '12px 0 4px'
                    }}>
                        {editingTask && (
                            <Popconfirm
                                title="确认删除"
                                description="删除后无法恢复，确定要删除这个任务吗？"
                                onConfirm={() => handleDeleteTask(editingTask.id)}
                                okText="删除"
                                cancelText="取消"
                                okType="danger"
                            >
                                <Button 
                                    danger 
                                    size="small"
                                    style={{ fontSize: '12px' }}
                                >
                                    删除任务
                                </Button>
                            </Popconfirm>
                        )}
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button 
                                onClick={handleCancelTask}
                                size="small"
                                style={{ fontSize: '12px' }}
                            >
                                取消
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={handleSaveTask}
                                size="small"
                                style={{ fontSize: '12px' }}
                            >
                                {editingTask ? '保存修改' : '创建任务'}
                            </Button>
                        </div>
                    </div>
                ]}
            >
                <div>
                    <Form {...formItemLayout}
                        form={taskForm}
                    >
                        <Form.Item
                            label={'任务标题'}
                            name="title"
                            rules={[
                                { required: true, message: '请输入任务标题' },
                                { max: 50, message: '任务标题不能超过50个字符' }
                            ]}
                        >
                            <Input
                                placeholder="请输入任务标题"
                                maxLength={50}
                                showCount
                            />
                        </Form.Item>

                        <Form.Item
                            label='日期区间'
                            name="dateRange"
                            rules={[
                                { required: true, message: '请选择日期区间' }
                            ]}
                        >
                            <RangePickerZH
                                placeholder={['开始日期', '结束日期']}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>

                        <Form.Item
                            label='任务描述'
                            name="description"
                        >
                            <TextArea
                                placeholder="请输入任务描述（可选）"
                                rows={3}
                                style={{ height: 60, resize: 'none' }}
                                maxLength={200}
                                showCount
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
        </ConfigProvider>
    );
}

export default TaskCalendarView;

