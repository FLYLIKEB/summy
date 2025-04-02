import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/ui/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: '체크박스 스타일 변형',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '체크박스 라벨',
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
    checked: {
      control: 'boolean',
      description: '체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: '이용약관에 동의합니다',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이용약관에 동의합니다',
    helperText: '개인정보 처리방침 및 서비스 이용약관에 대한 동의를 포함합니다',
  },
};

export const WithError: Story = {
  args: {
    label: '이용약관에 동의합니다',
    error: '계속하려면 이용약관에 동의해야 합니다',
  },
};

export const WithSuccess: Story = {
  args: {
    label: '이용약관에 동의합니다',
    success: true,
    checked: true,
  },
};

export const Checked: Story = {
  args: {
    label: '이용약관에 동의합니다',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '이용약관에 동의합니다',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '이용약관에 동의합니다',
    disabled: true,
    checked: true,
  },
};

export const FilledVariant: Story = {
  args: {
    label: '이용약관에 동의합니다',
    variant: 'filled',
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: '이용약관에 동의합니다',
    variant: 'outlined',
  },
};

export const WithLongLabel: Story = {
  args: {
    label: '개인정보 수집 및 이용, 마케팅 정보 수신에 대한 동의를 포함하는 모든 이용약관에 동의합니다',
  },
}; 