import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/ui/Select';
import { Globe, Users } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: '선택 필드 스타일 변형',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '선택 필드 라벨',
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
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    icon: {
      control: 'none',
      description: '아이콘 요소',
    },
    options: {
      control: 'object',
      description: '선택 옵션 배열',
    },
    groups: {
      control: 'object',
      description: '그룹화된 선택 옵션 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countries = [
  { value: 'kr', label: '한국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'gb', label: '영국' },
];

const programmingLanguages = [
  { 
    label: '프론트엔드',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ]
  },
  {
    label: '백엔드',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'spring', label: 'Spring' },
      { value: 'django', label: 'Django' },
      { value: 'laravel', label: 'Laravel' },
    ]
  }
];

export const Default: Story = {
  args: {
    label: '국가',
    options: countries,
  },
};

export const WithHelperText: Story = {
  args: {
    label: '국가',
    options: countries,
    helperText: '거주 국가를 선택하세요',
  },
};

export const WithError: Story = {
  args: {
    label: '국가',
    options: countries,
    error: '국가를 선택해주세요',
  },
};

export const WithSuccess: Story = {
  args: {
    label: '국가',
    options: countries,
    success: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: '국가',
    options: countries,
    icon: <Globe />,
  },
};

export const Disabled: Story = {
  args: {
    label: '국가',
    options: countries,
    disabled: true,
  },
};

export const FilledVariant: Story = {
  args: {
    label: '국가',
    options: countries,
    variant: 'filled',
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: '국가',
    options: countries,
    variant: 'outlined',
  },
};

export const WithGroups: Story = {
  args: {
    label: '프로그래밍 언어',
    groups: programmingLanguages,
  },
};

export const FullWidth: Story = {
  args: {
    label: '국가',
    options: countries,
    fullWidth: true,
  },
}; 