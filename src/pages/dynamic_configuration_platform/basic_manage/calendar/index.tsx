
import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Tooltip, Calendar, Modal, Input, Button, List, Badge, Typography, Space, message, DatePicker, Form, Popconfirm } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import CustomIcon from "@/components/custom-icon";
import './calendar.css'; // 引入自定义样式

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
        {
            id: '1',
            startDate: '2024-12-15',
            endDate: '2024-12-17',
            title: '项目规划会议',
            description: '讨论下季度项目规划',
            createdAt: '2024-12-10 10:00:00'
        },
        {
            id: '2',
            startDate: '2024-12-20',
            endDate: '2024-12-20',
            title: '客户拜访',
            description: '拜访重要客户',
            createdAt: '2024-12-10 11:00:00'
        }
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

    // 生成任务条的浅色系颜色
    const getTaskColor = (taskId: string) => {
        const colors = [
            { bg: '#e8f4fd', border: '#91caff', text: '#1677ff' }, // 浅蓝色
            { bg: '#f6ffed', border: '#b7eb8f', text: '#52c41a' }, // 浅绿色
            { bg: '#fff2e8', border: '#ffbb96', text: '#fa8c16' }, // 浅橙色
            { bg: '#f9f0ff', border: '#d3adf7', text: '#722ed1' }, // 浅紫色
            { bg: '#fff0f6', border: '#ffadd2', text: '#eb2f96' }, // 浅粉色
            { bg: '#e6fffb', border: '#87e8de', text: '#13c2c2' }, // 浅青色
            { bg: '#feffe6', border: '#eaff8f', text: '#a0d911' }, // 浅黄绿色
            { bg: '#fff7e6', border: '#ffd591', text: '#fa541c' }, // 浅黄色
        ];
        const index = (taskId.charCodeAt(0) * 137) % colors.length;
        return colors[index];
    };

    // 日期单元格渲染
    const dateCellRender = (value: Dayjs) => {
        const currentTasks = getTasksForDate(value);
        
        return (
            <div style={{ position: 'relative', height: '100px', minHeight: '80px' }}>
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
        <div style={{  }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 任务日历管理
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
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
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
                title={
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: editingTask ? '#1890ff' : '#52c41a',
                        padding: '4px 0'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: editingTask 
                                ? 'linear-gradient(135deg, #1890ff, #40a9ff)' 
                                : 'linear-gradient(135deg, #52c41a, #73d13d)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: editingTask 
                                ? '0 2px 8px rgba(24, 144, 255, 0.3)' 
                                : '0 2px 8px rgba(82, 196, 26, 0.3)'
                        }}>
                            <CustomIcon 
                                type={editingTask ? "icon-edit" : "icon-plus"} 
                                style={{ fontSize: '16px' }} 
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: '16px', marginBottom: '2px' }}>
                                {editingTask ? '编辑任务' : '新建任务'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', fontWeight: 400 }}>
                                {editingTask 
                                    ? `${dayjs(editingTask.startDate).format('MM月DD日')} - ${dayjs(editingTask.endDate).format('MM月DD日')}`
                                    : selectedDate?.format('YYYY年MM月DD日')
                                }
                            </div>
                        </div>
                    </div>
                }
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
                styles={{
                    header: {
                        borderBottom: 'none',
                        paddingBottom: '8px',
                        marginBottom: '0',
                        background: editingTask 
                            ? 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)' 
                            : 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
                        borderRadius: '8px 8px 0 0'
                    },
                    body: {
                        padding: '0'
                    },
                    content: {
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <div style={{ 
                    padding: '20px 24px',
                    background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)'
                }}>
                    <Form
                        form={taskForm}
                        layout="vertical"
                        initialValues={{
                            title: '',
                            description: '',
                            dateRange: null
                        }}
                    >
                        <Form.Item
                            label={
                                <span style={{ 
                                    fontWeight: 500, 
                                    color: '#262626',
                                    fontSize: '13px'
                                }}>
                                    任务标题
                                </span>
                            }
                            name="title"
                            rules={[
                                { required: true, message: '请输入任务标题' },
                                { max: 50, message: '任务标题不能超过50个字符' }
                            ]}
                            style={{ marginBottom: '16px' }}
                        >
                            <Input
                                placeholder="请输入任务标题"
                                maxLength={50}
                                showCount
                                style={{ 
                                    borderRadius: '6px',
                                    border: '1px solid #e8e8e8',
                                    fontSize: '13px'
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span style={{ 
                                    fontWeight: 500, 
                                    color: '#262626',
                                    fontSize: '13px'
                                }}>
                                    日期区间
                                </span>
                            }
                            name="dateRange"
                            rules={[
                                { required: true, message: '请选择日期区间' }
                            ]}
                            style={{ marginBottom: '16px' }}
                        >
                            <RangePicker
                                style={{ 
                                    width: '100%', 
                                    borderRadius: '6px',
                                    border: '1px solid #e8e8e8'
                                }}
                                placeholder={['开始日期', '结束日期']}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span style={{ 
                                    fontWeight: 500, 
                                    color: '#262626',
                                    fontSize: '13px'
                                }}>
                                    任务描述
                                </span>
                            }
                            name="description"
                        >
                            <TextArea
                                placeholder="请输入任务描述（可选）"
                                rows={3}
                                maxLength={200}
                                showCount
                                style={{ 
                                    borderRadius: '6px',
                                    border: '1px solid #e8e8e8',
                                    resize: 'none',
                                    fontSize: '13px'
                                }}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default TaskCalendarView;

