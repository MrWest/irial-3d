const styles = theme => ({
  PostCategory: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3ebfa',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 2.29,
    color: '#9846dd',
    fontFamily: 'Arial',
    padding: '0px 16px',
    textAlign: 'center',
    margin: '0 auto',
    minWidth: 114,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      height: 32
    }
  },

  PostCategorySmall: {
    height: 28,
    borderRadius: 14,
    backgroundColor: '#faba1b',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 2.29,
    color: '#1c5375',
    fontFamily: 'Arial',
    padding: '0px 16px',
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      height: 32
    }
  },
  PostCategoryOutlined: {
    height: 42,
    borderRadius: 21,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 2.29,
    color: '#8d9299',
    border: '1px solid #d3dbe5',
    fontFamily: 'Arial',
    padding: '0px 16px',
    textAlign: 'center',
    margin: '0 auto',
    minWidth: 114,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      height: 32
    }
  },
  PostCategoryWhite: {
    height: 38,
    borderRadius: 6,
    backgroundColor: 'rgba(256, 256, 256, 0.12);',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 2.29,
    color: '#ffffff',
    textTransform: 'uppercase',
    padding: '3px 8px',
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 6,
      fontSize: 10,
      height: 32
    }
  },
  Tab: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginTop: 18,
    textAlign: 'center',
    color: '#3577d4 !important',
    border: '1px solid #3577d4',
    height: 42,
    borderRadius: 21,
    marginRight: 20,
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 64,
      fontSize: 12
    }
  }
});

export default styles;
