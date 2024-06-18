import { expect, test } from '@playwright/test'
import { routes } from '~/utils/routes'
import { goto } from '~/utils/testsHelper.js'

test('Hello World', async ({ page }) => {
	await goto(page, routes.optimistic_keys)

	// in order for this to work, we should be able to create a new user
	// and then update it immediately
	await page.click('[data-test-action="create"]')

	// click on the last list in the row
	await page.click('[data-test-action="update"]')

	// wait a few seconds and make sure there are no errors
	await page.waitForTimeout(3000)
	let found = false
	try {
		await page.waitForSelector('[data-error="true"]', { timeout: 1000 })
		found = true
	} catch {}

	expect(found).toBe(false)

	// the value in the last row should be 'b'

	// wait for the final mutation to resolve
	await page.waitForTimeout(3000)

	// the value in the last row should be 'a'
})