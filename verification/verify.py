from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page
        page.goto("http://localhost:3000")

        # Wait for events to load (which would use our new Utils functions)
        page.wait_for_selector(".event-card")

        # Take a screenshot
        page.screenshot(path="verification/frontend_verify.png")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
