
import React from 'react'
import { expect, $ } from '@wdio/globals'
import { mock, fn, mocked } from '@wdio/browser-runner'
import { render } from '@testing-library/react'
import { useRouter } from 'next/router'

import Page from './[slug]'

mock('next/router', () => ({
    useRouter: fn()
}))

describe('Page Component', () => {
    it('should show be on home', async () => {
        mocked(useRouter).mockReturnValue({
            asPath: '/',
            isReady: true,
        } as any)
        const { container } = render(<Page />)
        await expect($(container).$('p'))
            .toHaveText('Hello, I\'m the / page')
    })

    it('should show be on about', async () => {
        mocked(useRouter).mockReturnValue({
            asPath: '/about',
            isReady: true,
        } as any)
        const { container } = render(<Page />)
        await expect($(container).$('p'))
            .toHaveText('Hello, I\'m the /about page')
    })
})
