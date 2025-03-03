import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvStringsService {

  static data = {
    // URL de los servicios
    // 'servicesURL' : 'https://app1.mapfre.com.pa/panama/webapi',
    'countryName' : 'EL SALVADOR',
    'userTypes' : [
      {
        'id' : 'P',
        'name' : 'PERITO'
      },
      {
        'id' : 'I',
        'name' : 'INTERMEDIARIO'
      },
      {
        'id' : 'C',
        'name' : 'CLIENTE'
      }
    ],
    // Textos generales que se comparten en varias pantallas
    'generalFormValidationError' : 'Debe ingresar algún de los datos para continuar',
    'generalTakePicError' : 'Debe tomar una foto',
    'generalButtonOk' : 'Aceptar',
    'generalButtonCancel' : 'Cancelar',
    'generalLabelTitle' : 'Auto inspección',
    'generalButtonBack' : 'Atrás',
    'generalButtonNext' : 'Continuar',
    'generalLabelStep' : 'Paso',
    'generalLabelSelect' : 'Seleccionar',
    'generalLabelInspection' : 'Inspección',
    'generalColor' : 'color',
    'generalBrand' : 'marca',
    'generalBrandLines' : 'linea - referencia',
    'generalSubparts' : 'pieza afectada',
    'generalAccesories' : 'accesorio',
    'generalStates' : 'departamento',
    'generalCities' : 'ciudad',
    'noInspections' : 'No se encontraron inspecciones',
    // Textos de la pantalla de inicio de sesión
    'loginLabelUsername' : 'Usuario',
    'loginLabelPassword' : 'Contraseña',
    'loginLabelUserType' : 'Tipo de usuario',
    'loginLabelUserTypeInspector' : 'PERITO',
    'loginLabelUserTypeInter' : 'INTERMEDIARIO',
    'loginLabelUserTypeCustomer' : 'CLIENTE',
    'loginButtonLogin' : 'Ingresar',
    'loginLabelTerms' : 'Términos y condiciones',
    'loginButtonAutoInspection' : 'Realizar Auto-Inspección',
    'loginError' : 'Nombre de usuario y/o contraseña incorrectos',
    // Textos de la pantalla de busqueda de inspección
    'enterCarLabelDocument' : 'Ingrese número de oferta',
    'enterCarLabelPlate' : 'Ingrese la placa del vehículo ',
    'enterCarLabelPolicy' : 'Número de póliza',
    'enterCarDocument' : 'OFERTA',
    'enterCarPlate' : 'PLACA',
    'enterCarPolicy' : 'PÓLIZA',
    'enterCarPlateBody' : 'El número de placa del vehículo debe corresponder al de la tarjeta de propiedad o matrícula',
    'searchlabelCityInspection' : '¿Cuál es tu ciudad?',
    'searchlabelStateInspection' : '¿Cuál es tu departamento?',
    // Textos de la pantalla de agendamiento
    'appointmentTitle' : 'Agendamiento inspección',
    'appointmentLabelScheduleAppointment' : 'Agendar cita',
    'appointmentPhoneNumber' : '%23624',
    'appointmentBody' : 'Haz clic en el ícono para proceder a atender tu cita de inspección en uno de nuestros centros de inspección MAPFRE certificado, programar una visita de inspección con uno de nuestros asesores o continuar para terminar tu auto inspección.',
    // Textos de la pantalla de datos del cliente
    'customerTitle' : 'Datos cliente',
    'customerLabelDocumentType' : 'Tipo de Documento',
    'customerDocumentType1' : 'DUI',
    'customerDocumentType2' : 'NIT',
    'customerDocumentType3' : 'Carnet de residente y Pasaporte',
    'customerDocumentTypeCode1' : 'DUI',
    'customerDocumentTypeCode2' : 'NIT',
    'customerDocumentTypeCode3' : 'PAS',
    'customerDocumentTypeError' : 'El tipo de documento es requerido',
    'customerLabelDocument' : 'Número de documentación',
    'customerDocumentError' : 'El documento es requerido',
    'customerLabelName' : 'Nombres',
    'customerNameError' : 'El nombre es requerido',
    'customerNameNote' : 'Como aparece en la matrícula',
    'customerLabelLastName' : 'Apellido paterno',
    'customerLastNameError' : 'El primer apellido es requerido',
    'customerLabelLastName2' : 'Apellido materno',
    'customerLastName2Error' : 'El segundo apellido es requerido',
    'customerLabelPhone' : 'Teléfono',
    'customerPhoneError' : 'El teléfono es requerido',
    'customerLabelEmail' : 'Email',
    'customerEmailError1' : 'El email es requerido',
    'customerEmailError2' : 'El email no es válido',
    'customerLabelAddress' : 'Dirección',
    'customerAddressError' : 'La Dirección es requerida',
    'customerLabelState' : 'Departamento',
    'customerStateError' : 'El departamento es requerido',
    'customerLabelCity' : 'Ciudad',
    'customerCityError' : 'La ciudad es requerida',
    // Textos de la pantalla de datos del vehículo
    'carInfoTitle' : 'Datos del vehículo',
    'carInfoBody' : '*Recuerda que debes tener a la mano la matrícula del vehículo a inspeccionar.',
    'carLabelSource' : 'Origen de auto',
    'carLabelType' : 'Tipo de vehículo',
    'carLabelPlate' : 'Número de placa',
    'carLabelTrack' : 'Tracción*',
    'carLabelInfoBrand' : 'Marca',
    'carInfoBrandError' : 'La marca es requerida',
    'carInfoLabelRefBrand' : 'Modelo',
    'carInfoRefBrandError' : 'El modelo es requerido',
    'carInfoLabelVIN' : 'Número de chasis VIN',
    'carInfoLabelAmout' : 'Suma asegurada solicitada',
    'carInfoLabelKm' : 'Kilometraje',
    'carInfoLabelModel' : 'Versión',
    'carInfoLabelYear' : 'Año de fabricación',
    'carInfoLabelPassenger' : 'Número de pasajeros',
    'carInfoModelError' : 'El año de fabricación es requerido',
    'carInfoLabelUnion' : 'Código Fasecolda',
    'carInfoLabelMotor' : 'Número de motor',
    'carInfoMotorError' : 'El número del motor es requerido',
    'carInfoLabelChasis' : 'Chasis',
    'carInfoChasisError' : 'El número del chasis es requerido',
    'carInfoLabelUse' : 'Uso',
    'carInfoUseError' : 'El uso es requerido',
    'carInfoLabelColor' : 'Color',
    'carInfoColorError' : 'El color es requerido',
    // Textos para la página de instrucciones para tomar las fotografías
    'instructTitle' : 'Información',
    'instructSubtitle' : 'Importante',
    'instructBody' : '<p>1. Activar el GPS en el dispositivo móvil.</p><p>2. Tarjeta de circulación del vehículo a mano.</p><p>3. Ubicar el vehículo en el exterior y contar con buena iluminación.</p><p>4. El plazo máximo para realizar la inspección es de 10 días desde que se agenda.</p><p>5. Comprobar conexión a internet, wi-fi o datos móviles.</p><p>6. El tiempo de inactividad es 15 minutos, luego debe ingresar nuevamente.</p>',
    // Textos para la página de fotografías del vehículo
    'carPicsTitle' : 'Fotografías del vehículo',
    'carPicsBody' : '*Recuerda que debes tomar todas las fotos especificadas en el plano y asociar los daños a la zona afectada.',
    'carPicsError' : 'Debe tomar la fotografía de ',
    // Textos para la página de toma de fotografías
    'takePic' : 'Foto',
    'takePicMaxDamage' : 'Se ha alcanzado el máximo número de daños permitido',
    'takeDeleteDamageConfirm' : '¿Desea eliminar este daño?',
    // Textos para la página de registro de daños
    'damageSelect' : 'Pieza afectada...',
    'discardPictureConfirm' : '¿Desea descartar la fotografía?',
    // Textos para la página con la lista de inspecciones
    'inspectionListTitle' : 'Inspecciones',
    // Textos para la página de accesorios
    'accesoriesTitle' : 'Accesorios vehículo',
    'accesoriesButtonAdd' : 'Incluir accesorios',
    'accesoryTitle' : 'Accesorios',
    'accesorySelect' : 'Tipo de accesorio...',
    'accesoruDeleteConfirm' : '¿Desea eliminar este accesorio?',
    // Textos para la página de fotos de documentos
    'docPicsTitle' : 'Inspección matrícula y chasís',
    'docMorePicsTitle' : 'Elige tu vehículo',
    'docPicsBody' : '* Recuerda que debes tener a la mano la matrícula original del vehículo a inspeccionar.',
    // Textos para la página de confirmación de carga de inspecciones
    'uploadSuccess' : 'La inspección se realizó correctamente.',
    'uploadSuccessBody' : 'Desde este momento se encuentra en proceso de aprobación.',
    // Textos para la página de aprobación de inspecciones
    'acceptTitle' : 'Aprobación de inspecciones',
    'acceptLabelResult' : '¿Cuál es tu concepto?',
    'acceptLabelNotes' : '¿Tienes comentarios adicionales?',
    'acceptButtonSend' : 'Enviar respuesta',
    // Parámetro para mostrar = 1 u ocultar = 0 la página de agendamiento de cita
    'appointmentPage_Show' : '1',
    // Parámetro para de obligatoriedad de los campos en el formulario de datos del cliente
    // obligatorio = 1 u opcional = 0
    'customerDocumentType_Mandatory' : '1',
    'customerDocument_Mandatory' : '1',
    'customerFirstName_Mandatory' : '1',
    'customerLastName_Mandatory' : '1',
    'customerSecondLastName_Mandatory' : '0',
    'customerPhone_Mandatory' : '1',
    'customerEmail_Mandatory' : '1',
    'customerCity_Mandatory' : '1',
    'customerAddress_Mandatory' : '1',
    'customerState_Mandatory' : '1',
    'customerCityCode_Mandatory' : '1',
    // Parámetros para la obligatoriedad de los campos en el formulario de datos del vehículo
    // obligatorio = 1 / opcional = 0
    'carInfoPlate_Mandatory' : '1',
    'carInfoBrand_Mandatory' : '1',
    'carInfoBrandLine_Mandatory' : '1',
    'carInfoVin_Mandatory' : '0',
    'carInfoModel_Mandatory' : '1',
    'carInfoCountryUnionCode_Mandatory' : '1',
    'carInfoMotor_Mandatory' : '1',
    'carInfoChasis_Mandatory' : '1',
    'carInfoUses_Mandatory' : '1',
    'carInfoColor_Mandatory' : '1',
    // Parámetros para de obligatoriedad de las fotos
    // obligatorio = 1 / opcional = 0
    'carPicsPart_Mandatory_1' : '1',
    'carPicsPart_Mandatory_2' : '1',
    'carPicsPart_Mandatory_3' : '1',
    'carPicsPart_Mandatory_4' : '1',
    'carPicsPart_Mandatory_5' : '1',

    'carPicsPart_Mandatory_6' : '1',
    'carPicsPart_Mandatory_7' : '1',
    'carPicsPart_Mandatory_8' : '1',
    'carPicsPart_Mandatory_9' : '1',
    'carPicsPart_Mandatory_10' : '1',
    'carPicsPart_Mandatory_11' : '1',
    'carPicsPart_Mandatory_12' : '1',
    'carPicsPart_Mandatory_13' : '1',
    'carPicsPart_Mandatory_14' : '1',
    'carPicsPart_Mandatory_15' : '1',
    'carPicsPart_Mandatory_16' : '1',
    'carPicsPart_Mandatory_17' : '1',
    'privacy_file' : 'Terminos_y_Condiciones_SV.pdf',
    'grant_type' : 'PWA503PASS'
  };
}
