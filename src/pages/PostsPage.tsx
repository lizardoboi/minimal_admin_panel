import React, { useEffect } from 'react';
import { Layout, Table, Pagination, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';  // <-- импортируем
import { fetchPostsRequest } from '../store/posts/actions';
import { RootState } from '../store/rootReducer';
import { logoutSuccess } from '../store/auth/actions';

const { Header, Content } = Layout;

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Author', dataIndex: 'authorName', key: 'authorName' },
    {
        title: 'Tags',
        dataIndex: 'tagNames',
        key: 'tags',
        render: (tags: string[]) => tags.join(', '),
    },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
];

export default function PostsPage() {
    const dispatch = useDispatch();
    const posts = useSelector((s: RootState) => s.posts);

    useEffect(() => {
        dispatch(fetchPostsRequest(posts.page, posts.limit));
    }, [dispatch, posts.page, posts.limit]);

    const onChangePage = (page: number, pageSize?: number) => {
        dispatch(fetchPostsRequest(page, pageSize || posts.limit));
    };

    const logout = () => {
        Cookies.remove('accessToken');    // <-- удаляем куки
        Cookies.remove('refreshToken');   // <-- удаляем куки
        dispatch(logoutSuccess());
        window.location.href = '/login';
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'white' }}>Admin Panel</div>
                <Button onClick={logout}>Выйти</Button>
            </Header>
            <Content style={{ padding: 24 }}>
                <Table
                    dataSource={posts.items}
                    rowKey="id"
                    loading={posts.loading}
                    pagination={false}
                    columns={columns}
                />
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Pagination
                        current={posts.page}
                        pageSize={posts.limit}
                        total={posts.total}
                        onChange={onChangePage}
                    />
                </div>
            </Content>
        </Layout>
    );
}