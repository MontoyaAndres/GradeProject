import React from 'react';
import Button from '@material-ui/core/Button';
import Desktop from '@material-ui/icons/DesktopWindows';
import Phone from '@material-ui/icons/StayCurrentPortrait';
import School from '@material-ui/icons/School';
import GitHub from '@material-ui/icons/Code';

import Layout from '../components/Global';
import { downloadManual } from '../utils/api';

const Help = ({ match: { url } }) => (
  <Layout url={url}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ padding: '30px 0' }}>
        <h1>Manual de usuario (Versión de escritorio)</h1>
        <Button
          onClick={() => downloadManual('desktop')}
          style={{ backgroundColor: '#F44336', color: 'white' }}
          variant="contained"
        >
          <Desktop style={{ marginRight: '1vh' }} />
          Decargar archivo
        </Button>
      </div>

      <div style={{ padding: '30px 0' }}>
        <h1>Manual de usuario (Versión para celulares)</h1>
        <Button
          onClick={() => downloadManual('phone')}
          style={{ backgroundColor: '#F44336', color: 'white' }}
          variant="contained"
        >
          <Phone style={{ marginRight: '1vh' }} />
          Decargar archivo
        </Button>
      </div>

      <div style={{ padding: '30px 0' }}>
        <h1>Ejemplo archivos Excel</h1>
        <Button
          onClick={() => downloadManual('excel')}
          style={{ backgroundColor: '#4CAF50', color: 'white' }}
          variant="contained"
        >
          <School style={{ marginRight: '1vh' }} />
          Decargar archivo
        </Button>
      </div>

      <div style={{ padding: '30px 0' }}>
        <h1>Guia de desarrollador</h1>
        <Button
          onClick={() =>
            window.open(
              'https://github.com/MontoyaAndres/GradeProject/blob/master/README.md#software-de-remisi%C3%B3n-excepci%C3%B3n-de-ausentismo'
            )
          }
          style={{ backgroundColor: 'black', color: 'white' }}
          variant="contained"
        >
          <GitHub style={{ marginRight: '1vh' }} />
          Ir a repositorio
        </Button>
      </div>
    </div>
  </Layout>
);

export default Help;
