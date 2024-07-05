import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import DepartmentList from '../DepartmentList';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 150 },
  ];

  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={posts} columns={columns} />
      </div>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
