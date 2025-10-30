#!/bin/bash

# Verification Script for Playwright E2E Testing Setup
# Run this script to verify the testing infrastructure is working correctly

set -e  # Exit on error

echo "=================================================="
echo "Playwright E2E Testing Verification"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "1. Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi
echo ""

# Check npm
echo "2. Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
echo ""

# Check Playwright installation
echo "3. Checking Playwright installation..."
if [ -f "node_modules/@playwright/test/package.json" ]; then
    PW_VERSION=$(node -p "require('./node_modules/@playwright/test/package.json').version")
    echo -e "${GREEN}✓ Playwright installed: v$PW_VERSION${NC}"
else
    echo -e "${RED}✗ Playwright not installed${NC}"
    echo "Run: npm install"
    exit 1
fi
echo ""

# Check axe-core installation
echo "4. Checking axe-core installation..."
if [ -f "node_modules/@axe-core/playwright/package.json" ]; then
    AXE_VERSION=$(node -p "require('./node_modules/@axe-core/playwright/package.json').version")
    echo -e "${GREEN}✓ @axe-core/playwright installed: v$AXE_VERSION${NC}"
else
    echo -e "${RED}✗ @axe-core/playwright not installed${NC}"
    echo "Run: npm install"
    exit 1
fi
echo ""

# Check browsers
echo "5. Checking Playwright browsers..."
if npx playwright --version &> /dev/null; then
    echo -e "${GREEN}✓ Playwright CLI available${NC}"

    # Try to list browsers
    if [ -d "$HOME/Library/Caches/ms-playwright" ] || [ -d "$HOME/.cache/ms-playwright" ]; then
        echo -e "${GREEN}✓ Browser cache directory found${NC}"
    else
        echo -e "${YELLOW}⚠ Browser cache not found, may need to run: npx playwright install${NC}"
    fi
else
    echo -e "${RED}✗ Playwright CLI not available${NC}"
    exit 1
fi
echo ""

# Check test files
echo "6. Checking test files..."
TEST_FILES=(
    "tests/e2e/navigation.spec.ts"
    "tests/e2e/hero-section.spec.ts"
    "tests/e2e/portfolio-sections.spec.ts"
    "tests/e2e/projects.spec.ts"
    "tests/e2e/contact-form.spec.ts"
    "tests/e2e/lotr-interactive.spec.ts"
    "tests/e2e/responsive.spec.ts"
    "tests/e2e/accessibility.spec.ts"
)

ALL_TESTS_EXIST=true
for file in "${TEST_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file (missing)${NC}"
        ALL_TESTS_EXIST=false
    fi
done

if [ "$ALL_TESTS_EXIST" = false ]; then
    echo -e "${RED}Some test files are missing${NC}"
    exit 1
fi
echo ""

# Check helper files
echo "7. Checking helper files..."
if [ -f "tests/helpers/test-helpers.ts" ]; then
    echo -e "${GREEN}✓ tests/helpers/test-helpers.ts${NC}"
else
    echo -e "${RED}✗ tests/helpers/test-helpers.ts (missing)${NC}"
    exit 1
fi
echo ""

# Check configuration
echo "8. Checking configuration files..."
if [ -f "playwright.config.ts" ]; then
    echo -e "${GREEN}✓ playwright.config.ts${NC}"
else
    echo -e "${RED}✗ playwright.config.ts (missing)${NC}"
    exit 1
fi
echo ""

# Check artifact directories
echo "9. Checking artifact directories..."
ARTIFACT_DIRS=("artifacts" "artifacts/screenshots" "artifacts/traces" "artifacts/a11y")
for dir in "${ARTIFACT_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓ $dir/${NC}"
    else
        echo -e "${YELLOW}⚠ $dir/ (will be created automatically)${NC}"
    fi
done
echo ""

# Check package.json scripts
echo "10. Checking package.json scripts..."
REQUIRED_SCRIPTS=("test:e2e" "test:e2e:ui" "test:e2e:headed" "test:e2e:debug" "test:e2e:report")
ALL_SCRIPTS_EXIST=true

for script in "${REQUIRED_SCRIPTS[@]}"; do
    if grep -q "\"$script\"" package.json; then
        echo -e "${GREEN}✓ npm run $script${NC}"
    else
        echo -e "${RED}✗ npm run $script (missing in package.json)${NC}"
        ALL_SCRIPTS_EXIST=false
    fi
done

if [ "$ALL_SCRIPTS_EXIST" = false ]; then
    echo -e "${RED}Some npm scripts are missing${NC}"
    exit 1
fi
echo ""

# Check port availability
echo "11. Checking port 3001 availability..."
if lsof -Pi :3001 -sTCP:LISTEN -t &> /dev/null; then
    echo -e "${YELLOW}⚠ Port 3001 is already in use${NC}"
    echo "   Process using port 3001:"
    lsof -i :3001 | grep LISTEN
    echo "   You may need to kill this process before running tests"
    echo "   Command: lsof -ti:3001 | xargs kill -9"
else
    echo -e "${GREEN}✓ Port 3001 is available${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo "Verification Summary"
echo "=================================================="
echo ""
echo -e "${GREEN}✓ All checks passed!${NC}"
echo ""
echo "Test Infrastructure Status: READY ✅"
echo ""
echo "Total Test Suites: 8"
echo "Estimated Test Cases: 215+"
echo "Browser Coverage: 5 configurations"
echo ""
echo "Next Steps:"
echo "1. Run all tests:         npm run test:e2e"
echo "2. Open test UI:          npm run test:e2e:ui"
echo "3. Run in headed mode:    npm run test:e2e:headed"
echo "4. View test report:      npm run test:e2e:report"
echo "5. Debug specific test:   npx playwright test --debug -g 'test name'"
echo ""
echo "Documentation:"
echo "- Setup Guide:   TESTING_SETUP_COMPLETE.md"
echo "- Full Docs:     tests/README.md"
echo "- Artifacts:     artifacts/README.md"
echo ""
echo "=================================================="
