import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/Input';
import { Search, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: '입력 필드 스타일 변형',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    error: {
      control: 'text',
      description: '오류 메시지 (입력 시 오류 상태로 변경)',
    },
    success: {
      control: 'boolean',
      description: '성공 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비로 확장',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    icon: {
      control: 'none',
      description: '아이콘 요소',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: '입력 필드 타입',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
    helperText: '회사 이메일을 사용하세요',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
    error: '유효한 이메일 주소를 입력해주세요',
  },
};

export const WithSuccess: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
    success: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
    icon: <Mail />,
    iconPosition: 'left',
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    icon: <Search />,
    iconPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일 주소를 입력하세요',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const FilledVariant: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    variant: 'filled',
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    variant: 'outlined',
  },
};

export const FullWidth: Story = {
  args: {
    label: '메시지',
    placeholder: '메시지를 입력하세요',
    fullWidth: true,
  },
}; 