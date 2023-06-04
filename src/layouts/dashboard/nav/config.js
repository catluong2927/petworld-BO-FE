// component
import { useSelector } from "react-redux";
import SvgColor from '../../../components/svg-color';
import NavSection from '../../../components/nav-section';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigAdmin = () => [
    {
        title: 'dashboard',
        path: `/dashboard/app`,
        icon: icon('ic_analytics'),
    },
    {
        title: 'user',
        path: `/dashboard/admin/user`,
        icon: icon('ic_user'),
    },
    {
        title: 'product',
        path: `/dashboard/admin/products`,
        icon: icon('ic_cart'),
    },
    {
        title: 'center',
        path: `/dashboard/admin/centers`,
        icon: icon('ic_center'),
    },
    {
        title: 'package',
        path: `/dashboard/admin/packages`,
        icon: icon('ic_package'),
    },
];

const navConfigOwner = () => [
    {
        title: 'dashboard',
        path: `/dashboard/app`,
        icon: icon('ic_analytics'),
    },
    {
        title: 'center',
        path: `/dashboard/owner/centers`,
        icon: icon('ic_center'),
    },
    {
        title: 'package',
        path: `/dashboard/owner/packages`,
        icon: icon('ic_package'),
    },
];

const navConfigSeller = () => [
    {
        title: 'dashboard',
        path: `/dashboard/app`,
        icon: icon('ic_analytics'),
    },
    {
        title: 'product',
        path: `/dashboard/seller/products`,
        icon: icon('ic_cart'),
    },
    {
        title: 'center',
        path: `/dashboard/seller/centers`,
        icon: icon('ic_center'),
    },
    {
        title: 'package',
        path: `/dashboard/seller/packages`,
        icon: icon('ic_package'),
    },
];

function NewNavConfig() {
    const isLogin = useSelector((state) => state.auth.login?.currentUser);
    const roles = isLogin.userDtoResponse.userRoleDtos.map(role => role.roleDtoResponse.name);

    const prefix = "ROLE_";
    let currentRoles = [];
    if (roles.length > 0) {
        for(let i = 0; i < roles.length; i+=1){
            const role = roles[i].substring(prefix.length).toLocaleLowerCase();
            console.log(role)
            if (role === 'admin') {
                console.log('1', navConfigAdmin())
                currentRoles = [...navConfigAdmin()];
                break;
            }
            if (role === 'owner') {
                console.log('2', navConfigOwner())
                currentRoles = [...navConfigOwner()];
                break;
            }
            if (role === 'seller') {
                console.log('3', navConfigSeller())
                currentRoles = [...navConfigSeller()];
                break;
            }
        };
    }

    return (
        <NavSection data={currentRoles} />
    )
}


export default NewNavConfig;