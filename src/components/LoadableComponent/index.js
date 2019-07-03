import Loadable from 'react-loadable';

function LoadableComponent(module){
	Loadable({
		loader: () =>
			import (module),
		loading: () =>{
			return ''
		},
	})
}
export default LoadableComponent
