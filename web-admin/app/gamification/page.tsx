'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Tag, Avatar, Row, Col, Statistic, Breadcrumb, message, List, Progress } from 'antd';
import { TrophyOutlined, UserOutlined, StarOutlined, RocketOutlined, PlusOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';
import gamificationService, { LeaderboardEntry, Badge, PointRule, GamificationStats } from '@/services/gamification.service';

const { Title, Text } = Typography;

export default function GamificationPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [rules, setRules] = useState<PointRule[]>([]);
    const [stats, setStats] = useState<GamificationStats>({ totalPoints: 0, totalPlayers: 0, totalBadges: 0, totalRules: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [lData, bData, rData, sData] = await Promise.all([
                gamificationService.getLeaderboard(),
                gamificationService.getBadges(),
                gamificationService.getPointRules(),
                gamificationService.getStats()
            ]);
            setLeaderboard(lData);
            setBadges(bData);
            setRules(rData);
            setStats(sData);
        } catch (error) {
            console.error('Failed to fetch gamification data:', error);
            message.error('Không thể tải dữ liệu gamification');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatPoints = (points: number): string => {
        if (points >= 1000000) return (points / 1000000).toFixed(1) + 'M';
        if (points >= 1000) return (points / 1000).toFixed(1) + 'K';
        return points.toString();
    };

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Gamification</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Gamification</Title>
                    <Text type="secondary">Quản lý điểm thưởng, huy hiệu và bảng xếp hạng người dùng</Text>
                </div>
                <Space>
                    <Button icon={<ReloadOutlined />} onClick={fetchData} />
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Tạo huy hiệu
                    </Button>
                </Space>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng điểm phát" value={stats.totalPoints} prefix={<StarOutlined style={{ color: '#faad14' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Người tham gia" value={stats.totalPlayers} prefix={<UserOutlined style={{ color: '#1890ff' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Huy hiệu" value={stats.totalBadges} prefix={<TrophyOutlined style={{ color: '#722ed1' }} />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Quy tắc" value={stats.totalRules} prefix={<RocketOutlined style={{ color: '#52c41a' }} />} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Card title="Bảng xếp hạng" extra={<Button type="link">Xem tất cả</Button>}>
                        <List
                            loading={loading}
                            itemLayout="horizontal"
                            dataSource={leaderboard}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: index === 0 ? '#faad14' : index === 1 ? '#bfbfbf' : index === 2 ? '#d48806' : '#f0f0f0', color: index < 3 ? '#fff' : '#666' }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        }
                                        title={<Text strong>{item.userName}</Text>}
                                        description={`${item.level} • ${item.badges} huy hiệu`}
                                    />
                                    <div style={{ textAlign: 'right' }}>
                                        <Text strong style={{ color: '#1890ff', fontSize: '18px' }}>{item.points.toLocaleString()}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: '11px' }}>điểm</Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Huy hiệu phổ biến">
                        <List
                            loading={loading}
                            itemLayout="horizontal"
                            dataSource={badges}
                            renderItem={(item) => (
                                <List.Item extra={<Button icon={<EditOutlined />} type="link" />}>
                                    <List.Item.Meta
                                        avatar={<div style={{ fontSize: '32px' }}>{item.icon}</div>}
                                        title={<Text strong>{item.name}</Text>}
                                        description={
                                            <div>
                                                <Text type="secondary">{item.description}</Text>
                                                <br />
                                                <Tag color="blue" style={{ marginTop: '4px' }}>{item.awarded} người đạt được</Tag>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: '24px' }} title="Quy tắc tính điểm">
                <Row gutter={[16, 16]}>
                    {rules.map((rule) => (
                        <Col span={8} key={rule.id}>
                            <Card size="small" hoverable>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text>{rule.action}</Text>
                                    <Text strong style={{ color: '#52c41a' }}>+{rule.points}</Text>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
}
