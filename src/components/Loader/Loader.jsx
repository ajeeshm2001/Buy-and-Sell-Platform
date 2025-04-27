import Dialog from '@mui/material/Dialog'


export const Loader = () => {
  return (
    <Dialog open fullScreen hideBackdrop
      sx={{
        '& .MuiPaper-root': {
          background: 'none !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(2px)'
        }
      }}
      disableScrollLock={true}>
      <div style={{
        display: 'block',
        position: 'relative',
        width: '125px',
        height: '125px',
        borderRadius: '50%',
        border: '4px solid transparent',
        borderTop: '4px solid #F50963',
        '-webkit-animation': 'spin 2s linear infinite',
        animation: 'spin 2s linear infinite',
        '&::before, &::after': {
          content: "''",
          position: 'absolute',
          borderRadius: '50%',
          border: '4px solid transparent'
        },
        '&::before': {
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: '5px',
          borderTopColor: '#1e1e1e',
          '-webkit-animation': 'spin 3s linear infinite',
          animation: 'spin 3.5s linear infinite'
        },
        '&::after': {
          top: '15px',
          left: '15px',
          right: '15px',
          bottom: '15px',
          borderTopColor: '#1e1e1e',
          '-webkit-animation': 'spin 1.5s linear infinite',
          animation: 'spin 1.75s linear infinite'
        }
      }}></div>
      <style>{
        `@-webkit-keyframes spin {
from {
-webkit-transform: rotate(0deg);
transform: rotate(0deg);
}

to {
-webkit-transform: rotate(360deg);
transform: rotate(360deg);
}
}

@keyframes spin {
from {
-webkit-transform: rotate(0deg);
transform: rotate(0deg);
}

to {
-webkit-transform: rotate(360deg);
transform: rotate(360deg);
}
}`}
      </style>
    </Dialog>
  )
}
