package com.example.libreria_in_47_app.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.libreria_in_47_app.DataBaseSQLiteHelper;
import com.example.libreria_in_47_app.R;
import com.example.libreria_in_47_app.models.UserClass;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class EditUserActivity extends AppCompatActivity {

    ImageView ivRegresar;
    Button btnCancelarActUser;
    Button btnActualizaUser;
    EditText txtEditNom, txtEditApe, txtEditEmail, txtEditDni, txtEditTelefono;
    UserClass user;
    DataBaseSQLiteHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_user);
        dbHelper = new DataBaseSQLiteHelper(this);
        ivRegresar = findViewById(R.id.ivRegresar);
        txtEditNom = findViewById(R.id.txtEditNom);
        txtEditApe = findViewById(R.id.txtEditApe);
        txtEditEmail = findViewById(R.id.txtEditEmail);
        txtEditDni = findViewById(R.id.txtEditDni);
        txtEditTelefono = findViewById(R.id.txtEditTelefono);
        btnActualizaUser = findViewById(R.id.btnActualizaUser);
        btnCancelarActUser = findViewById(R.id.btnCancelarActUser);

        ivRegresar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(EditUserActivity.this, accountactivity.class);
                startActivity(i);
            }
        });

        // Botón para cancelar la edición y volver a la actividad de cuenta
        btnCancelarActUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(EditUserActivity.this, accountactivity.class);
                startActivity(intent);
            }
        });

        // Configura el OnClickListener para el botón de actualización
        btnActualizaUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Obtiene el usuario por su ID
                long userId = dbHelper.getLoggedUserId(EditUserActivity.this);
                UserClass user = dbHelper.getUserById(userId);

                // Verifica si se encontró un usuario con el ID dado
                if (user != null) {
                    // Obtiene los nuevos datos del usuario desde los campos de texto
                    String nuevoNombre = txtEditNom.getText().toString();
                    String nuevoApellido = txtEditApe.getText().toString();
                    String nuevoEmail = txtEditEmail.getText().toString();
                    String nuevoDni = txtEditDni.getText().toString();
                    String nuevoTelefono = txtEditTelefono.getText().toString();

                    // Obtiene la fecha y hora actual usando getCurrentDateTime
                    String fechaModificacion = getCurrentDateTime();

                    // Crea una instancia de UserClass con los nuevos datos
                    UserClass usuarioActualizado = new UserClass(
                            user.getIdUser(),
                            nuevoNombre,
                            nuevoApellido,
                            user.getPassword(), // Mantiene la contraseña actual
                            user.getTipo_usuario(), // Mantiene el tipo de usuario actual
                            nuevoEmail,
                            nuevoDni,
                            user.getFecha_nac(), // Mantiene la fecha de nacimiento actual
                            nuevoTelefono,
                            user.getFecha_creacion(), // Mantiene la fecha de creación actual
                            fechaModificacion // Actualiza la fecha de modificación
                    );

                    // Actualiza los datos en la base de datos
                    dbHelper.updateUser(usuarioActualizado);

                    // Muestra un mensaje de éxito
                    Toast.makeText(EditUserActivity.this, "Datos actualizados", Toast.LENGTH_SHORT).show();

                    // Redirige a la actividad de la cuenta
                    Intent intent = new Intent(EditUserActivity.this, accountactivity.class);
                    startActivity(intent);
                } else {
                    // Si no se encuentra el usuario, muestra un mensaje de error o toma otra acción adecuada
                    Toast.makeText(EditUserActivity.this, "Usuario no encontrado", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // Obtener el usuario actual y mostrar sus datos en los EditText
        long userId = dbHelper.getLoggedUserId(this);
        user = dbHelper.getUserById(userId);

        txtEditNom.setText(user.getNombre());
        txtEditApe.setText(user.getApellido());
        txtEditEmail.setText(user.getEmail());
        txtEditDni.setText(user.getDni());
        txtEditTelefono.setText(user.getTelefono());
    }

    // Método para obtener la fecha y hora actual
    private String getCurrentDateTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
        return sdf.format(new Date());
    }
}
