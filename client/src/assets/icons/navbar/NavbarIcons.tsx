export type IconsType = 'desktop-logo-black'
type Type = {
    value: IconsType;
};

export const NavbarIcons = ({ value }: Type) => { 
    if (value==='desktop-logo-black') {
        return <svg width="88" height="31" viewBox="0 0 88 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="-19.6367" y="-31.9999" width="134.545" height="75.6364" fill="black" />
        </svg>

    }

    return <></>
}