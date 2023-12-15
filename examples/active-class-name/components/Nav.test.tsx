
import React from 'react'
import { expect, $ } from '@wdio/globals'
import { mock, fn, mocked } from '@wdio/browser-runner'
import { render } from '@testing-library/react'
import { useRouter } from 'next/router'

import Nav from './Nav'

mock('next/router', () => ({
    useRouter: fn()
}))

describe('Nav Component', () => {
    it('should show be on home', async () => {
        mocked(useRouter).mockReturnValue({
            asPath: '/',
            isReady: true,
        } as any)
        render(<Nav />)
        await expect($('a.active')).toHaveText('Home')
    })

    it('should show be on about', async () => {
        mocked(useRouter).mockReturnValue({
            asPath: '/about',
            isReady: true,
        } as any)
        render(<Nav />)
        await expect($('a.active')).toHaveText('About')
    })
})
