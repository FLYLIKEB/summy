const fs = require('fs');
const path = require('path');

const importMappings = {
  // 레이아웃 컴포넌트
  '@/components/Navbar': '@/components/layout/Navbar',
  '@/components/NavbarWrapper': '@/components/layout/NavbarWrapper',
  '@/components/LegalLayout': '@/components/layout/LegalLayout',
  '@/components/PageNavigation': '@/components/layout/PageNavigation',
  '@/components/ui/Sidebar': '@/components/layout/sidebar/Sidebar',
  
  // 사이드바 컴포넌트
  '@/components/ui/sidebar/': '@/components/layout/sidebar/',
  
  // 대시보드 컴포넌트
  '@/components/common/Dashboard': '@/components/dashboard/Dashboard',
  '@/components/common/StatCard': '@/components/dashboard/StatCard',
  '@/components/common/UniversalList': '@/components/dashboard/UniversalList',
  '@/components/common/ContentCard': '@/components/dashboard/ContentCard',
  '@/components/common/FilterPanel': '@/components/dashboard/FilterPanel',
  '@/components/common/EmptyState': '@/components/dashboard/EmptyState',
  '@/components/ui/DashboardFooter': '@/components/dashboard/DashboardFooter',
  '@/components/common/types': '@/components/dashboard/types',
  
  // UI 컴포넌트
  '@/components/ui/Button': '@/components/common/Button',
  '@/components/ui/Input': '@/components/common/Input',
  '@/components/ui/Select': '@/components/common/Select',
  '@/components/ui/Checkbox': '@/components/common/Checkbox',
  '@/components/ui/Textarea': '@/components/common/Textarea',
  '@/components/ui/FormControl': '@/components/common/FormControl',
  '@/components/ui/RadioGroup': '@/components/common/RadioGroup',
  '@/components/ui/Toast': '@/components/common/Toast',
  '@/components/ui/card': '@/components/common/card',
  '@/components/ui/Icon': '@/components/common/Icon',
  '@/components/ui/Logo': '@/components/common/Logo',
  '@/components/ui/Section': '@/components/common/Section',
  '@/components/ui/ScrollDownButton': '@/components/common/ScrollDownButton',
  '@/components/ui/FeatureGrid': '@/components/common/FeatureGrid',
  '@/components/ui/StepList': '@/components/common/StepList',
  
  // 인증 컴포넌트
  '@/components/GoogleLoginButton': '@/components/auth/GoogleLoginButton',
  '@/components/KakaoLoginButton': '@/components/auth/KakaoLoginButton',
  
  // 랜딩 페이지 컴포넌트
  '@/components/Hero': '@/components/landing/Hero',
  '@/components/Features': '@/components/landing/Features',
  '@/components/Reviews': '@/components/landing/Reviews',
  '@/components/HowItWorks': '@/components/landing/HowItWorks',
  '@/components/SpecialFeatures': '@/components/landing/SpecialFeatures',
  '@/components/FinalCTA': '@/components/landing/FinalCTA',
  '@/components/Footer': '@/components/landing/Footer',
  '@/components/Demo': '@/components/landing/Demo',
  '@/components/PersonaProblems': '@/components/landing/PersonaProblems',
  
  // 유틸리티 컴포넌트
  '@/components/FileUpload': '@/components/utils/FileUpload',
  '@/components/ui/PageTransition': '@/components/utils/PageTransition',
  '@/components/ui/MobileNewSummaryButton': '@/components/utils/MobileNewSummaryButton',
  
  // 테마 관련
  '@/components/ui/theme/': '@/components/theme/',
};

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      walkDir(filePath, callback);
    } else if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
      callback(filePath);
    }
  });
}

function updateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    for (const [oldImport, newImport] of Object.entries(importMappings)) {
      const regex = new RegExp(oldImport.replace(/\//g, '\\/'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newImport);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// 프로젝트 루트 디렉토리에서 시작
walkDir('.', updateImports);

console.log('Import paths updated successfully!'); 