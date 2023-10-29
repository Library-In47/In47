package com.example.libreria_in_47_app.activities;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.libreria_in_47_app.R;
import com.example.libreria_in_47_app.models.BookClass;

import java.util.List;

public class WishlistAdapter extends RecyclerView.Adapter<WishlistAdapter.ViewHolder> {
    private List<BookClass> data;
    private Context context;

    private WishlistAdapter.OnItemClickListener enviarLibro;

    public interface OnItemClickListener {
        void enviarLibro(BookClass book);
    }

    public WishlistAdapter(Context context, List<BookClass> data) {
        this.context = context;
        this.data = data;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.wishlist_layout, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull WishlistAdapter.ViewHolder holder, int position) {
        final BookClass book = data.get(position);
        holder.textTitleW.setText(book.getTitle());
        holder.textDescriptionW.setText(book.getDescription());

        // Obtener la referencia al ImageView de la tapa del libro.
        ImageView bookCoverImageView = holder.itemView.findViewById(R.id.imageView4);

        // Configurar el OnClickListener en la tapa del libro.
        bookCoverImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (enviarLibro != null) {
                    enviarLibro.enviarLibro(book);
                }
            }
        });
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        enviarLibro = listener;
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView textTitleW;
        TextView textDescriptionW;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            textTitleW = itemView.findViewById(R.id.textTitleW);
            textDescriptionW = itemView.findViewById(R.id.textDescriptionW);
        }
    }
}
