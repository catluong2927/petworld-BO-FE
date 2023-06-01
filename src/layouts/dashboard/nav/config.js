// component
import { useSelector } from "react-redux";
import SvgColor from '../../../components/svg-color';
import NavSection from '../../../components/nav-section';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = (role) => [
    {
        title: 'dashboard',
        path: `/dashboard/app`,
        icon: icon('ic_analytics'),
    },
    {
        title: 'user',
        path: `/dashboard/${role}/user`,
        icon: icon('ic_user'),
    },
    {
        title: 'product',
        path: `/dashboard/${role}/products`,
        icon: icon('ic_cart'),
    },
    {
        title: 'center',
        path: `/dashboard/${role}/centers`,
        icon: icon('ic_center'),
    },
    {
        title: 'package',
        path: `/dashboard/${role}/packages`,
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
            if (role === 'admin') {
                console.log('1', navConfig(role))
                currentRoles = [...navConfig(role)];
                break;
            }
            if (role === 'owner') {
                console.log('2', navConfig(role))
                currentRoles = [...navConfig(role)];
                break;
            }
            if (role === 'seller') {
                console.log('3', navConfig(role))
                currentRoles = [...navConfig(role)];
                break;
            }
        };
    }

    return (
        <NavSection data={currentRoles} />
    )
}


export default NewNavConfig;