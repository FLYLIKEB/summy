import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/Button';
import { Plus, ArrowRight } from 'lucide-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'link', 'destructive'],
      description: '버튼 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비로 확장',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    startIcon: {
      control: 'none',
      description: '시작 아이콘',
    },
    endIcon: {
      control: 'none',
      description: '종료 아이콘',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: '버튼',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '기본 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '보조 버튼',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '고스트 버튼',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: '링크 버튼',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '삭제 버튼',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '큰 버튼',
  },
};

export const WithStartIcon: Story = {
  args: {
    children: '추가하기',
    startIcon: <Plus size={16} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: '계속하기',
    endIcon: <ArrowRight size={16} />,
  },
};

export const FullWidth: Story = {
  args: {
    children: '전체 너비 버튼',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    disabled: true,
  },
};
