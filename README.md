# VitruvianLab 프로젝트

VitruvianLab 프로젝트는 Turborepo를 기반으로 구축된 모노레포입니다. 여러 앱과 패키지를 효율적으로 관리하고, 코드 재사용성을 높이며, 일관된 개발 경험을 제공하는 것을 목표로 합니다.

## 프로젝트 소개

VitruvianLab 프로젝트는 여러 앱과 패키지를 단일 저장소에서 관리하는 모노레포 구조를 채택하고 있습니다. 이러한 구조는 다음과 같은 이점을 제공합니다.

- **코드 재사용성**: 여러 앱과 패키지에서 공통으로 사용하는 코드를 공유하고 재사용할 수 있습니다.
- **일관성 유지**: 디자인 시스템, 코드 스타일, TypeScript 설정 등을 중앙에서 관리하여 프로젝트 전체의 일관성을 유지합니다.
- **빌드 및 배포 간소화**: Turborepo를 통해 의존성 그래프를 분석하고 병렬 빌드를 지원하여 빌드 시간을 단축하고, 배포 프로세스를 간소화합니다.
- **개발 환경의 용이성**: 로컬에서 모든 프로젝트를 한 번에 개발 모드로 실행하여 편의성을 높입니다.
- **손쉬운 유지 보수**: 공통 모듈을 한 번에 수정해 모든 프로젝트에 적용할 수 있어 유지 보수가 용이합니다.

## 프로젝트 구성

이 프로젝트는 다음과 같은 앱과 패키지로 구성되어 있습니다.

### 앱 (Apps)

- **`web`**: Next.js로 구축된 웹 애플리케이션입니다. 사용자 인터페이스를 제공하며, `@vitruvianlab/design-system`에서 제공하는 UI 컴포넌트를 활용합니다.
- **`docs`**: Next.js로 구축된 문서 사이트입니다. 프로젝트 관련 문서, 디자인 시스템 가이드 등을 제공하며, `@vitruvianlab/design-system`을 사용하여 일관된 디자인을 유지합니다.

### 패키지 (Packages)

- **`@vitruvianlab/design-tokens`**: 디자인 시스템에서 사용하는 토큰(색상, 간격, 폰트, 그림자, 타이포그래피 등)을 정의하고 관리하는 패키지입니다. Style Dictionary를 기반으로 빌드 되며, 다양한 플랫폼(웹, 모바일)에 적용 가능한 토큰을 생성합니다. 이 패키지는 PandaCSS에서 사용하는 CSS 변수들을 정의하는 역할도 합니다.
  - `package.json`의 `"main": "dist/pandacss.js"` 는 PandaCSS에서 사용할 토큰 파일을 지정합니다.
  - `package.json`의 `"types": "dist/pandacss.d.ts"`는 PandaCSS의 type definition 파일 위치를 지정합니다.
- **`@vitruvianlab/design-system`**: 재사용 가능한 UI 컴포넌트 라이브러리입니다. 웹 애플리케이션(`web`)과 문서 사이트(`docs`)에서 공유하여 사용됩니다. `@vitruvianlab/design-tokens`에서 정의된 디자인 토큰을 기반으로 하며, PandaCSS를 활용하여 스타일링을 구현합니다.
  - `package.json`의 `"exports": { "./*": "./src/*.tsx" }` 는 외부에서 컴포넌트를 import 할 수 있도록 지정합니다.
  - `package.json`의 `"prepare": "panda codegen"` 는 `pnpm install` 시 panda codegen 명령어를 실행합니다.
- **`@repo/eslint-config`**: 프로젝트 전반에서 일관된 코드 스타일을 유지하기 위한 ESLint 설정 패키지입니다. Next.js 및 Prettier 설정을 포함하며, 코드 품질과 일관성을 높이는 데 기여합니다.
- **`@repo/typescript-config`**: 프로젝트 전반에서 일관된 TypeScript 설정을 유지하기 위한 `tsconfig.json` 파일들의 모음입니다. 이를 통해 모든 앱과 패키지에서 동일한 타입 검사 규칙을 적용할 수 있습니다.

모든 패키지와 앱은 100% TypeScript로 작성되어 타입 안정성을 높이고, 코드 유지보수를 용이하게 합니다.

## 주요 기술 스택

- **Turborepo**: 모노레포 관리를 위한 고성능 빌드 시스템입니다. 의존성 그래프 분석, 캐싱, 병렬 빌드 등을 지원하여 빌드 속도를 크게 향상시킵니다.
- **Next.js**: React 기반의 웹 프레임워크입니다. 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API 라우트 등을 지원하여 고성능 웹 애플리케이션을 구축할 수 있습니다.
- **TypeScript**: 정적 타입 검사를 지원하는 자바스크립트 상위 집합 언어입니다. 코드의 안정성과 유지보수성을 크게 향상시킵니다.
- **ESLint**: 코드 스타일을 검사하고 잠재적인 오류를 찾는 도구입니다. `@repo/eslint-config`를 통해 프로젝트 전체에 일관된 규칙을 적용합니다.
- **Prettier**: 일관된 코드 포맷팅을 유지하기 위한 도구입니다. 코드 가독성을 높이고, 리뷰를 용이하게 합니다.
- **PandaCSS**: CSS-in-JS 방식을 사용하는 라이브러리입니다. `@vitruvianlab/design-tokens`에서 정의된 토큰을 활용하여 스타일링을 효율적으로 관리합니다. 타입-세이프한 스타일링 경험을 제공합니다.
- **Style Dictionary**: 다양한 플랫폼에 맞춘 디자인 토큰을 생성하는 도구입니다. `@vitruvianlab/design-tokens`에서 사용되어, 웹뿐만 아니라 다른 플랫폼에서도 재사용 가능한 토큰을 생성합니다.
- **pnpm**: 고성능 패키지 매니저입니다. 디스크 공간을 효율적으로 사용하고, 의존성 설치 속도가 빠릅니다. 모노레포 환경에서 특히 강력한 성능을 발휘합니다.
- **tsup**: 라이브러리 빌드를 위한 툴입니다. 빠른 속도와 TypeScript 지원으로 라이브러리 개발을 간편하게 만들어줍니다.
- **tsx**: TypeScript 파일을 바로 실행할 수 있는 도구입니다.

## 시작하기

### 개발 환경 준비

1.  **Node.js 및 pnpm 설치**: 프로젝트를 실행하기 위해서는 Node.js와 pnpm이 설치되어 있어야 합니다.

    - Node.js (>=18) : [https://nodejs.org/](https://nodejs.org/) 에서 다운로드
    - pnpm : `npm install -g pnpm` 명령어를 터미널에 입력해서 설치.
    - `package.json` 에서 `"packageManager": "pnpm@9.0.0"` 를 확인합니다.

2.  **의존성 설치**: 프로젝트의 루트 디렉토리에서 다음 명령어를 실행하여 모든 앱과 패키지의 의존성을 설치합니다.

    ```bash
    pnpm install
    ```

### 개발 환경 설정

프로젝트의 루트 디렉토리에서 다음 명령어를 실행하여 각 패키지의 개발 환경을 설정합니다.

#### Design Tokens 개발 및 빌드

디자인 토큰 패키지(`@vitruvianlab/design-tokens`)는 Style Dictionary를 사용하여 토큰을 정의하고 생성합니다.

- **개발**: 디자인 토큰을 실시간으로 수정하고 변경 사항을 확인하려면 다음 명령어를 실행합니다.

  ```bash
  pnpm dt dev
  ```

  이 명령어는 `packages/design-tokens/package.json` 에 명시된 `dev` 스크립트를 실행합니다.(`tsx watch src/index.ts --clear-screen=false`)
  파일 변경을 감지하고 `dist` 폴더에 결과물을 생성합니다.

- **빌드 (배포)**: 디자인 토큰을 최종적으로 빌드하려면 다음 명령어를 실행합니다.

  ```bash
  pnpm dt build
  ```

  이 명령어는 `packages/design-tokens/package.json` 에 명시된 `build` 스크립트를 실행합니다.(`tsx src/index.ts --clear-screen=false`)
  `dist` 폴더에 결과물을 생성합니다.

#### Design System 개발 및 빌드

디자인 시스템 패키지(`@vitruvianlab/design-system`)는 재사용 가능한 UI 컴포넌트를 개발하는 곳입니다.

- **개발**: UI 컴포넌트를 실시간으로 수정하고 변경 사항을 확인하려면 다음 명령어를 실행합니다.

  ```bash
  pnpm ds dev
  ```

  이 명령어는 `packages/design-system/package.json` 에 명시된 `dev` 스크립트를 실행합니다.(`tsup --watch --dts-resolve`)
  파일 변경을 감지하고 `dist` 폴더에 결과물을 생성합니다.

- **빌드 (배포)**: UI 컴포넌트를 최종적으로 빌드하려면 다음 명령어를 실행합니다.

  ```bash
  pnpm ds build
  ```

  이 명령어는 `packages/design-system/package.json` 에 명시된 `build` 스크립트를 실행합니다.(`tsup --dts-resolve`)
  `dist` 폴더에 결과물을 생성합니다.

### 전체 프로젝트 빌드 및 개발 모드 실행

#### 빌드

모든 앱과 패키지를 빌드하려면 다음 명령어를 실행합니다.

```bash
pnpm build
```
