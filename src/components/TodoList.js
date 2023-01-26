import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="TEMP_1" done={true} />
      <TodoItem text="TEMP_2" done={true} />
      <TodoItem text="TEMP_3" done={false} />
      <TodoItem text="TEMP_4" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;