import { useCallback, useState } from "react"

export default function MainMenu() {
    const joinPublic = useCallback(() => {
        document.querySelector<HTMLElement>("body > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > button")?.click()
        setLoading(true)
    }, [])

    const [isLoading, setLoading] = useState(false)
    
    return isLoading ? <></> : <div className="fixed z-50 inset-0 w-screen h-screen bg-[url(/background.jpg)] bg-cover">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <img draggable={false} src="/menu/LOGO.svg" width={350} />
                <div className="mx-auto flex justify-center gap-5 mt-10">
                    <button className="hover:scale-110 hover:rotate-6 transition-transform duration-200">
                        <img draggable={false} src="/menu/StartPublic.svg" width={120} onClick={joinPublic} />
                    </button>
                    <button className="hover:scale-110 hover:-rotate-6 transition-transform duration-200">
                        <img draggable={false} src="/menu/StartPrivate.svg" width={120} />
                    </button>
                </div>
        </div>
    </div>
}