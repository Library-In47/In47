package com.example.libreria_in_47_app.activities;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.libreria_in_47_app.DataBaseSQLiteHelper;
import com.example.libreria_in_47_app.R;
import com.example.libreria_in_47_app.models.BookClass;
import com.example.libreria_in_47_app.models.UserClass;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.List;

public class MainActivity extends AppCompatActivity  implements BookAdapter.OnItemClickListener, BookAdapter.OnRatingChangeListener {

    DataBaseSQLiteHelper dbHelper;

    ImageButton mButton;
    ImageButton wButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Instanciar un objeto de la clase DataBaseSQLiteHelper.
        dbHelper = new DataBaseSQLiteHelper(this);

        // Guardar la lista en una variable.
        List<BookClass> response = dbHelper.getAllBooks();

        // Configurar el RecyclerView y su adaptador
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        BookAdapter adapter = new BookAdapter(this, response);

        adapter.setOnItemClickListener(this); // Establecer el listener en MainActivity
        adapter.setOnRatingChangeListener(this);

        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Navegación.
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigation);
        bottomNavigationView.setSelectedItemId(R.id.bottom_inicio);
        bottomNavigationView.setOnItemSelectedListener(item -> {
            if (item.getItemId() == R.id.bottom_inicio) {
                return true;
            } else if (item.getItemId() == R.id.bottom_deseos) {
                startActivity(new Intent(getApplicationContext(), WishlistActivity.class));
                overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                //finish();
                return true;
            } else if (item.getItemId() == R.id.bottom_cotacto) {
                startActivity(new Intent(getApplicationContext(), ContactActivity.class));
                overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                //finish();
                return true;
            } else if (item.getItemId() == R.id.bottom_perfil) {
                startActivity(new Intent(getApplicationContext(), accountactivity.class));
                overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                //finish();
                return true;
            }
            return false;
        });

        // Boton de alerta de novedades

        mButton = findViewById(R.id.imageView6);

        mButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAlertDialog();
            }
        });

        // Boton de mensajeria por WhatsApp

        wButton = findViewById(R.id.imageButton);

        wButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String url = "https://api.whatsapp.com/send?phone=5491122223333&text=Hola!%20Quisiera%20recibir%20ayuda%20por%20favor";
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setData(Uri.parse(url));
                startActivity(i);
            }
        });


    }

    private void showAlertDialog(){
        AlertDialog.Builder builder= new AlertDialog.Builder(this);
        builder.setTitle("Crear Alerta");
        builder.setMessage("Quisieras estar al tanto de nuestras novedades?");
        builder.setPositiveButton("Si", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                Toast.makeText(MainActivity.this, "Alerta creada!", Toast.LENGTH_SHORT).show();
                dialogInterface.dismiss();
            }
        });
        builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });

        builder.create().show();

    }

    @Override
    public void enviarLibro(BookClass book) {
        // Obtener el ID del libro.
        int bookId = book.getId();

        // Crear un Intent para abrir la actividad BookDetail.
        Intent intent = new Intent(this, BookDetail.class);

        // Pasar el ID del libro como extra en el Intent
        intent.putExtra("book_id", bookId);

        // Iniciar la actividad BookDetail
        startActivity(intent);
    }

    @Override
    public void onRatingChange(int bookId, float newRating) {
        dbHelper.rateBook(bookId, newRating);
    }
}