class GrupoService {
  getGrupos () {
    return [
      {
        nombre: 'Lácteos'
      },
      {
        nombre: 'Carnes'
      },
      {
        nombre: 'Cereales'
      },
      {
        nombre: 'Azúcar'
      },
      {
        nombre: 'Frutas y Verduras'
      },
      {
        nombre: 'Grasas. salsas y aderezos'
      },
      {
        nombre: 'Colados'
      },
      {
        nombre: 'Preparaciones'
      },
      {
        nombre: 'Dietéticos'
      },
      {
        nombre: 'Powerbars'
      },
      {
        nombre: 'Bebidas calientes'
      },
      {
        nombre: 'Alcohol'
      }
    ]
  }

  getSubgrupos () {
    return [
      {
        nombre: 'LECHES LIQUIDAS',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'LECHES EN POLVO',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'LECHES INFANTILES EN POLVO',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'OTRAS LECHES',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'QUESOS',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'YOGHURTS',
        grupo: {
          nombre: 'Lácteos'
        }
      },
      {
        nombre: 'HUEVOS',
        grupo: {
          nombre: 'Carnes'
        }
      },
      {
        nombre: 'CARNES, PESCADOS, MARISCOS Y FIAMBRES',
        grupo: {
          nombre: 'Carnes'
        }
      },
      {
        nombre: 'PESCADOS Y MARISCOS EN CONSERVA',
        grupo: {
          nombre: 'Carnes'
        }
      },
      {
        nombre: 'CEREALES, HARINAS Y LEGUMINOSAS',
        grupo: {
          nombre: 'Cereales'
        }
      },
      {
        nombre: 'GALLETAS',
        grupo: {
          nombre: 'Cereales'
        }
      },
      {
        nombre: 'PAN, MASAS Y PASTAS EN GENERAL',
        grupo: {
          nombre: 'Cereales'
        }
      },
      {
        nombre: 'CHOCOLATES',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'HELADOS',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'BEBIDAS GASEOSAS',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'NÉCTARES',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'BEBIDA REFRESCANTE DE FANTASIA',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'JUGOS EN POLVO',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'AZÚCAR, MIEL, MERMELADAS Y OTROS',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'POSTRES',
        grupo: {
          nombre: 'Azúcar'
        }
      },
      {
        nombre: 'VERDURAS, FRUTAS, ALGAS Y CALLAMPAS',
        grupo: {
          nombre: 'Frutas y Verturas'
        }
      },
      {
        nombre: 'PRODUCTOS GRASOS, SALSAS Y ADEREZOS',
        grupo: {
          nombre: 'Grasas, salsas y aderezos'
        }
      },
      {
        nombre: 'PRODUCTOS INFANTILES COLADOS',
        grupo: {
          nombre: 'Colados'
        }
      },
      {
        nombre: 'CREMAS Y SOPAS PREPARADAS',
        grupo: {
          nombre: 'Preparaciones'
        }
      },
      {
        nombre: 'ALIMENTOS PREPARADOS Y COCKTAIL',
        grupo: {
          nombre: 'Preparaciones'
        }
      },
      {
        nombre: 'PREPARACIONES HABITUALES CHILENAS',
        grupo: {
          nombre: 'Preparaciones'
        }
      },
      {
        nombre: 'ALIMENTOS DIETÉTICOS',
        grupo: {
          nombre: 'Dietéticos'
        }
      },
      {
        nombre: 'POWERBAR',
        grupo: {
          nombre: 'Powerbars'
        }
      },
      {
        nombre: 'BEBIDAS CALIENTES INSTANTÁNEAS',
        grupo: {
          nombre: 'Bebidas calientes'
        }
      },
      {
        nombre: 'BEBIDAS ALCOHOLICAS',
        grupo: {
          nombre: 'Alcohol'
        }
      }
    ]
  }
}

export const grupoService = new GrupoService()
